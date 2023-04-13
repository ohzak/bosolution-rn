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
import { LanguageContext } from "../../translations/translationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { AuthContext } from "../../contexts/AuthContext";
import {
  reg_email,
  reg_password,
  reg_swiss_telephone,
} from "../../utils/regex";
import { GOOGLE_PLACES_API_KEY } from "../../config";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewBase } from "react-native";

export function SignUp({ navigation }) {
  const { i18n, locale } = useContext(LanguageContext);
  const { register } = useContext(AuthContext);

  const initialData = {};

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const proceed = async () => {
    if (validate()) {
      navigation.navigate("SignUp_Address", { data: data });
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
    if (valid) {
      return true;
    } else {
      setErrors(messages);
    }
  };

  const autocomplete = (d, details) => {
    let address = details.address_components.find((item) =>
      item.types.includes("route")
    )?.long_name;
    let number = details.address_components.find((item) =>
      item.types.includes("street_number")
    )?.long_name;
    let city = details.address_components.find((item) =>
      item.types.includes("locality")
    )?.long_name;
    let state = details.address_components.find((item) =>
      item.types.includes("administrative_area_level_1")
    )?.short_name;
    let zip = details.address_components.find((item) =>
      item.types.includes("postal_code")
    )?.long_name;

    setData({
      ...data,
      address: `${address} ${number}`,
      city: city,
      state: state,
      zip: zip,
      placeId: d.place_id,
    });
  };
  return (
    <Center flex={1}>
      <Box safeArea w="100%" maxW={"400px"} py="8" bg={"white"} rounded={"xl"}>
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
            <FormControl.Label>{i18n.t("confirm_password")}</FormControl.Label>
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
            <FormControl.Label>{i18n.t("telephone_number")}</FormControl.Label>
            <Input
              placeholder={i18n.t("telephone_number")}
              onChangeText={(value) => setData({ ...data, telephone: value })}
            />
            <FormControl.ErrorMessage>
              {errors?.telephone}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={"submit" in errors}>
            <Button
              isLoading={isLoading}
              isLoadingText={i18n.t("submitting")}
              onPress={async () => {
                setIsLoading(true);
                proceed();
                setIsLoading(false);
              }}
            >
              {i18n.t("proceed")}
            </Button>
            <FormControl.ErrorMessage>{errors.submit}</FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
    </Center>
  );
}
