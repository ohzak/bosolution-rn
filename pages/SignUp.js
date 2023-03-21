import { useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  View,
  VStack,
} from "native-base";
import { LanguageContext } from "../translations/translationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { AuthContext } from "../contexts/AuthContext";
import { reg_email, reg_password, reg_swiss_telephone } from "../utils/regex";
import { GOOGLE_PLACES_API_KEY } from "../config";

export function SignUp({ navigation }) {
  const { i18n, locale } = useContext(LanguageContext);
  const { register } = useContext(AuthContext);

  const initialData = {};

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const sumbitRegistration = async () => {
    if (validate()) {
      try {
        await register(
          data.email,
          data.password,
          data.name,
          data.lastname,
          data.address,
          data.city,
          data.state,
          data.telephone,
          data.zip
        );
      } catch (error) {
        setErrors({ ...errors, submit: error });
      }
    }
  };

  const validate = () => {
    let valid = true;
    let messages = {};
    if (data.email === null) {
      valid = false;
    } else if (!reg_email.test(data.email)) {
      messages = { ...messages, email: i18n.t("email_invalid") };
      valid = false;
    }
    if (!reg_password.test(data.password)) {
      messages = { ...messages, password: i18n.t("password_invalid") };
      valid = false;
    } else if (data.password !== (data.confirm_password ?? null)) {
      messages = { ...messages, password: i18n.t("password_no_match") };
      valid = false;
    }
    if (data.name === null || data.name === "") {
      messages = { ...messages, name: i18n.t("name_required") };
      valid = false;
    }
    if (data.lastname === null || data.lastname === "") {
      messages = { ...messages, lastname: i18n.t("lastname_required") };
      valid = false;
    }
    if (!reg_swiss_telephone.test(data.telephone)) {
      messages = { ...messages, telephone: i18n.t("swiss_telephone_invalid") };
      valid = false;
    }
    if (data.address === null || data.address === "") {
      messages = { ...messages, address: i18n.t("address_required") };
      valid = false;
    }
    if (data.city === null || data.city === "") {
      messages = { ...messages, city: i18n.t("city_required") };
      valid = false;
    }
    if (data.state === null || data.state === "") {
      messages = { ...messages, state: i18n.t("state_required") };
      valid = false;
    }
    if (data.zip === null || data.zip === "") {
      messages = { ...messages, zip: i18n.t("zip_required") };
      valid = false;
    }
    if (valid) {
      return true;
    } else {
      setErrors(messages);
    }
  };
  return (
    <ScrollView mt={Constants.statusBarHeight}>
      <Center flex={1}>
        <Box
          safeArea
          w="100%"
          maxW={"400px"}
          py="8"
          bg={"white"}
          rounded={"xl"}
        >
          <Heading
            alignSelf={"center"}
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            {i18n.t("welcome")}
          </Heading>
          <Heading
            mt="1"
            color="coolGray.400"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
            alignSelf={"center"}
          >
            {i18n.t("sign_up_subtitle")}
          </Heading>
          <VStack space={3} mx="5" mt="10">
            <FormControl isInvalid={"email" in errors}>
              <FormControl.Label>{i18n.t("email")}</FormControl.Label>
              <Input
                placeholder={i18n.t("email")}
                onChangeText={(value) => setData({ ...data, email: value })}
              />
              {"email" in errors ? (
                <FormControl.ErrorMessage>
                  {errors?.email}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>{""}</FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isInvalid={"password" in errors}>
              <FormControl.Label>{i18n.t("password")}</FormControl.Label>
              <Input
                type="password"
                placeholder={i18n.t("password")}
                onChangeText={(value) => setData({ ...data, password: value })}
              />
              {"password" in errors ? (
                <FormControl.ErrorMessage>
                  {errors?.password}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  {i18n.t("password_helper")}
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isInvalid={"password" in errors}>
              <FormControl.Label>
                {i18n.t("confirm_password")}
              </FormControl.Label>
              <Input
                type={"password"}
                placeholder={i18n.t("confirm_password")}
                onChangeText={(value) =>
                  setData({ ...data, confirm_password: value })
                }
              />
            </FormControl>
            <FormControl isInvalid={"name" in errors}>
              <FormControl.Label>{i18n.t("name")}</FormControl.Label>
              <Input
                placeholder={i18n.t("name")}
                onChangeText={(value) => setData({ ...data, name: value })}
              />
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label isInvalid={"lastname" in errors}>
                {i18n.t("last_name")}
              </FormControl.Label>
              <Input
                placeholder={i18n.t("last_name")}
                onChangeText={(value) => setData({ ...data, lastname: value })}
              />
              <FormControl.ErrorMessage>
                {errors?.lastname}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"telephone" in errors}>
              <FormControl.Label>
                {i18n.t("telephone_number")}
              </FormControl.Label>
              <Input
                placeholder={i18n.t("telephone_number")}
                onChangeText={(value) => setData({ ...data, telephone: value })}
              />
              <FormControl.ErrorMessage>
                {errors?.telephone}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"address" in errors}>
              <FormControl.Label>{i18n.t("address")}</FormControl.Label>
              <Input
                placeholder={i18n.t("address")}
                onChangeText={(value) => setData({ ...data, address: value })}
              />
              <FormControl.ErrorMessage>
                {errors?.address}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"state" in errors}>
              <FormControl.Label>{i18n.t("state")}</FormControl.Label>
              <Input
                placeholder={i18n.t("state")}
                onChangeText={(value) => setData({ ...data, state: value })}
              />
              <FormControl.ErrorMessage>
                {errors?.state}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"city" in errors}>
              <FormControl.Label>{i18n.t("city")}</FormControl.Label>
              <Input
                placeholder={i18n.t("city")}
                onChangeText={(value) => setData({ ...data, city: value })}
              />
              <FormControl.ErrorMessage>
                {errors?.city}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"zip" in errors}>
              <FormControl.Label>{i18n.t("zip")}</FormControl.Label>
              <Input
                placeholder={i18n.t("zip")}
                onChangeText={(value) => setData({ ...data, zip: value })}
              />
              <FormControl.ErrorMessage>{errors?.zip}</FormControl.ErrorMessage>
            </FormControl>
            <GooglePlacesAutocomplete
              placeholder="Search"
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: "en", // language of the results
              }}
              onPress={(data, details = null) => console.log(data)}
              onFail={(error) => console.error(error)}
              requestUrl={{
                url: "https://maps.googleapis.com/maps/api",
                useOnPlatform: "web",
              }} // this in only required for use on the web. See https://git.io/JflFv more for details.
            />
            <FormControl isInvalid={"submit" in errors}>
              <Button
                isLoading={isLoading}
                isLoadingText={i18n.t("submitting")}
                onPress={async () => {
                  setIsLoading(true);
                  await sumbitRegistration().then(() => {
                    setIsLoading(false);
                  });
                }}
              >
                {i18n.t("sign_up")}
              </Button>
              <FormControl.ErrorMessage>
                {errors.submit}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}
