import { useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { LanguageContext } from "../translations/translationContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import axiosInstance from "../utils/axios";

export const Validation = ({ navigator }) => {
  const { i18n, locale } = useContext(LanguageContext);
  const { user, validate } = useContext(AuthContext);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");

  const changeValidationMail = () => {
    axiosInstance
      .post("/Security/changevalidationmail", { email: email })
      .then()
      .error();
  };

  return (
    <Center flex={1}>
      <Box safeArea w="100%" maxW={"400px"} py="8" bg={"white"} rounded={"xl"}>
        <VStack space="8" mx="8">
          <Heading
            alignSelf={"center"}
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            {i18n.t("validate")}
          </Heading>
          <Text fontSize={"sm"}>
            {i18n.t("email_sent_pre")}
            {user.email}
            {i18n.t("email_sent_post")}
          </Text>
          <FormControl>
            <FormControl.Label>
              {i18n.t("change_validation_email")}
            </FormControl.Label>
            <Input
              text="change"
              placeholder={i18n.t("new_email")}
              onChangeText={(value) => setEmail(value)}
            />
          </FormControl>
          <Button
            colorScheme={"primary"}
            onPress={() => changeValidationMail()}
          >
            <Text>{i18n.t("change_email")}</Text>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
