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

export function SignUp_Address({ route, navigation }) {
  const { i18n, locale } = useContext(LanguageContext);
  const { register } = useContext(AuthContext);

  const initialData = {};

  const [data, setData] = useState(route.params.data);
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
          data.zip,
          data.placeId
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
        <VStack space={5} mx="5">
          <FormControl>
            <FormControl.Label>{i18n.t("complete_address")}</FormControl.Label>
            <GooglePlacesAutocomplete
              placeholder="Search"
              query={{
                key: "AIzaSyA14yD0_GZHN21qjThSndnfq1lw2cfMe9M",
                language: "en", // language of the results
              }}
              onPress={(d, details = null) => autocomplete(d, details)}
              onFail={(error) => console.error(error)}
              requestUrl={{
                url: "http://localhost:8010/proxy",
                useOnPlatform: "web",
              }}
              fetchDetails
              styles={{ textInput: { borderColor: "Black", borderWidth: 1 } }}
            />
          </FormControl>
          <FormControl isInvalid={"address" in errors}>
            <FormControl.Label>{i18n.t("street")}</FormControl.Label>
            <Input
              placeholder={i18n.t("street")}
              value={data?.address}
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
              value={data?.state}
              onChangeText={(value) => setData({ ...data, state: value })}
            />
            <FormControl.ErrorMessage>{errors?.state}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={"city" in errors}>
            <FormControl.Label>{i18n.t("city")}</FormControl.Label>
            <Input
              placeholder={i18n.t("city")}
              value={data?.city}
              onChangeText={(value) => setData({ ...data, city: value })}
            />
            <FormControl.ErrorMessage>{errors?.city}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={"zip" in errors}>
            <FormControl.Label>{i18n.t("zip")}</FormControl.Label>
            <Input
              placeholder={i18n.t("zip")}
              value={data?.zip}
              onChangeText={(value) => setData({ ...data, zip: value })}
            />
            <FormControl.ErrorMessage>{errors?.zip}</FormControl.ErrorMessage>
          </FormControl>

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
            <FormControl.ErrorMessage>{errors.submit}</FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
    </Center>
  );
}
