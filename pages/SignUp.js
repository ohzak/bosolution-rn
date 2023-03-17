import { useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  View,
  VStack,
} from "native-base";
import { LanguageContext } from "../translations/translationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { ScrollView } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { reg_email, reg_password, reg_swiss_telephone } from "../utils/regex";

export function SignUp({ navigation }) {
  const { i18n, locale } = useContext(LanguageContext);
  const { register } = useContext(AuthContext);

  const initialData = {
    email: null,
    password: null,
    name: null,
    lastname: null,
    telephone: null,
    address: null,
    state: null,
    city: null,
    zip: null,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

  const sumbitRegistration = () => {
    if (validate()) {
      register(
        data.email,
        data.password,
        data.name,
        data.lastName,
        data.address,
        data.city,
        data.state,
        data.telephone,
        data.zip
      );
    }
  };

  const validate = () => {
    let valid = true;
    if (data.email === null) {
      setErrors({ ...errors, email: i18n.t("email_required") });
      valid = false;
    } else if (!reg_email.test(data.email)) {
      setErrors({ ...errors, email: i18n.t("email_invalid") });
      valid = false;
    }
    if (!reg_password.test(data.password)) {
      setErrors({ ...errors, password: i18n.t("password_invalid") });
      valid = false;
    } else if (data.password !== (data.confirm_password ?? null)) {
      setErrors({ ...errors, password: i18n.t("password_no_match") });
      valid = false;
    }
    if (data.name === null || data.name === "") {
      setErrors({ ...errors, name: i18n.t("name_required") });
      valid = false;
    }
    if (data.lastname === null || data.lastname === "") {
      setErrors({ ...errors, lastname: i18n.t("lastname_required") });
      valid = false;
    }
    if (!reg_swiss_telephone.test(data.telephone)) {
      setErrors({ ...errors, telephone: i18n.t("swiss_telephone_invalid") });
      valid = false;
    }
    if (data.address === null || data.address === "") {
      setErrors({ ...errors, address: i18n.t("address_required") });
      valid = false;
    }
    if (data.city === null || data.city === "") {
      setErrors({ ...errors, city: i18n.t("city_required") });
      valid = false;
    }
    if (data.state === null || data.state === "") {
      setErrors({ ...errors, state: i18n.t("state_required") });
      valid = false;
    }
    if (data.zip === null || data.zip === "") {
      setErrors({ ...errors, zip: i18n.t("zip_required") });
      valid = false;
    }
    return valid;
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
            <FormControl>
              <FormControl.Label>{i18n.t("email")}</FormControl.Label>
              <Input
                placeholder={i18n.t("email")}
                onChangeText={(value) => setData({ ...data, email: value })}
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("password")}</FormControl.Label>
              <Input
                type="password"
                placeholder={i18n.t("password")}
                onChangeText={(value) => setData({ ...data, password: value })}
              />
              {errors.password === null ? (
                <FormControl.HelperText>
                  {i18n.t("password_helper")}
                </FormControl.HelperText>
              ) : (
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl>
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
            <FormControl>
              <FormControl.Label>{i18n.t("name")}</FormControl.Label>
              <Input
                placeholder={i18n.t("name")}
                onChangeText={(value) => setData({ ...data, name: value })}
              />
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("last_name")}</FormControl.Label>
              <Input
                placeholder={i18n.t("last_name")}
                onChangeText={(value) => setData({ ...data, lastname: value })}
              />
              <FormControl.ErrorMessage>
                {errors.lastname}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>
                {i18n.t("telephone_number")}
              </FormControl.Label>
              <Input
                placeholder={i18n.t("telephone_number")}
                onChangeText={(value) => setData({ ...data, telephone: value })}
              />
              <FormControl.ErrorMessage>
                {errors.telephone}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("address")}</FormControl.Label>
              <Input
                placeholder={i18n.t("address")}
                onChangeText={(value) => setData({ ...data, address: value })}
              />
              <FormControl.ErrorMessage>
                {errors.address}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("state")}</FormControl.Label>
              <Input
                placeholder={i18n.t("state")}
                onChangeText={(value) => setData({ ...data, state: value })}
              />
              <FormControl.ErrorMessage>
                {errors.state}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("city")}</FormControl.Label>
              <Input
                placeholder={i18n.t("city")}
                onChangeText={(value) => setData({ ...data, city: value })}
              />
              <FormControl.ErrorMessage>{errors.city}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("zip")}</FormControl.Label>
              <Input
                placeholder={i18n.t("zip")}
                onChangeText={(value) => setData({ ...data, city: value })}
              />
              <FormControl.ErrorMessage>{errors.zip}</FormControl.ErrorMessage>
            </FormControl>
            <Button
              onPress={() => {
                sumbitRegistration();
              }}
            >
              {i18n.t("sign_up")}
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}
