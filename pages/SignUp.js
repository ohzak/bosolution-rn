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
import { useContext, useState } from "react";
import { LanguageContext } from "../translations/translationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { ScrollView } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export function SignUp({ navigation }) {
  const { i18n, locale } = useContext(LanguageContext);
  const {} = useContext(AuthContext);

  initialData = {
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

  const sumbitRegistration = () => {};

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
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("password")}</FormControl.Label>
              <Input
                type="password"
                placeholder={i18n.t("password")}
                onChangeText={(value) => setData({ ...data, password: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                {i18n.t("confirm_password")}
              </FormControl.Label>
              <Input
                type={"password"}
                placeholder={i18n.t("confirm_password")}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("name")}</FormControl.Label>
              <Input
                placeholder={i18n.t("name")}
                onChangeText={(value) => setData({ ...data, name: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("last_name")}</FormControl.Label>
              <Input
                placeholder={i18n.t("last_name")}
                onChangeText={(value) => setData({ ...data, lastname: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                {i18n.t("telephone_number")}
              </FormControl.Label>
              <Input
                placeholder={i18n.t("telephone_number")}
                onChangeText={(value) => setData({ ...data, telephone: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("address")}</FormControl.Label>
              <Input
                placeholder={i18n.t("address")}
                onChangeText={(value) => setData({ ...data, address: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("state")}</FormControl.Label>
              <Input
                placeholder={i18n.t("state")}
                onChangeText={(value) => setData({ ...data, state: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("city")}</FormControl.Label>
              <Input
                placeholder={i18n.t("city")}
                onChangeText={(value) => setData({ ...data, city: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("zip")}</FormControl.Label>
              <Input
                placeholder={i18n.t("zip")}
                onChangeText={(value) => setData({ ...data, city: value })}
              />
            </FormControl>
            <Button mt="2" colorScheme="primary">
              {i18n.t("sign_up")}
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}
