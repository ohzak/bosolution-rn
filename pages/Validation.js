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
  const [validationCode, setValidationCode] = useState(null);
  const [error, setError] = useState({});
  const [confirmation, setConfirmation] = useState({});
  const [changeEmail, setChangeEmail] = useState(null);

  const sendValidationMail = () => {
    axiosInstance
      .post("/Security/sendValidation", {
        email: email,
        fullName: `${user.name} ${user.lastname}`,
        subject: i18n.t("validate_email_subject"),
        prefix: i18n.t("email_prefix"),
        message: i18n.t("email_message"),
        subMessage: i18n.t("email_submessage"),
        verify: i18n.t("email_verify_label"),
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            setConfirmation({ ...confirmation, send: i18n.t("email_sent") });
            break;
          case 400:
            setError({ ...error, send: i18n.t("problem_sending_email") });
          case 404:
            setError(i18n.t({ ...error, send: "missing_connection" }));
        }
      });
  };
  const sendValidationCode = () => {
    axiosInstance
      .post("/Security/validateEmail", {
        code: validationCode,
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            setConfirmation({
              ...confirmation,
              code: i18n.t("email_validated"),
            });
            setTimeout(() => {
              refreshUser();
            }, 3000);
            break;
          case 400:
            setError({ ...error, code: i18n.t("wrong_validation_code") });
            break;
          case 404:
            setError(i18n.t({ ...error, code: "missing_connection" }));
            break;
        }
      });
  };
  const changeValidationMail = () => {
    axiosInstance
      .post("/Security/changevalidationmail", {
        email: changeEmail,
        fullName: `${user.name} ${user.lastname}`,
        subject: i18n.t("validate_email_subject"),
        prefix: i18n.t("email_prefix"),
        message: i18n.t("email_message"),
        subMessage: i18n.t("email_submessage"),
        verify: i18n.t("email_verify_label"),
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            setConfirmation({
              ...confirmation,
              change: i18n.t("email_sent"),
            });
            break;
          case 400:
            setError({ ...error, change: i18n.t("problem_sending_email") });
            break;
          case 404:
            setError(i18n.t({ ...error, change: "missing_connection" }));
            break;
        }
      })
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
          <Text fontSize={"sm"}>{i18n.t("email_sent_pre")}</Text>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.email}
          </Text>
          <Text>{i18n.t("email_sent_post")}</Text>
          <FormControl>
            <Button
              colorScheme={"primary"}
              onPress={() => sendValidationMail()}
            >
              <Text color="white">{i18n.t("send_email")}</Text>
            </Button>
            <FormControl.ErrorMessage>
              {error?.send ?? null}
            </FormControl.ErrorMessage>
            <FormControl.HelperText color={"success.500"}>
              {confirmation?.send ?? null}
            </FormControl.HelperText>
          </FormControl>

          <FormControl>
            <FormControl.Label>
              <Text>{i18n.t("validation_code")}</Text>
            </FormControl.Label>
            <FormControl>
              <Input
                placeholder={i18n.t("validation_code")}
                onChangeText={(value) => setValidationCode(value)}
              ></Input>
            </FormControl>
          </FormControl>
          <FormControl>
            <Button
              colorScheme={"primary"}
              onPress={() => sendValidationCode()}
            >
              <Text color="white">{i18n.t("validate")}</Text>
            </Button>
            <FormControl.HelperText color={"success.500"}>
              {confirmation?.code ?? null}
            </FormControl.HelperText>
            <FormControl.ErrorMessage>
              {error?.code ?? null}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              {i18n.t("change_validation_email")}
            </FormControl.Label>
            <Input
              text="change"
              placeholder={i18n.t("new_email")}
              onChangeText={(value) => setChangeEmail(value)}
            />
          </FormControl>
          <FormControl>
            <Button
              colorScheme={"primary"}
              onPress={() => changeValidationMail()}
            >
              <Text color="white">{i18n.t("change_email")}</Text>
            </Button>
            <FormControl.HelperText>
              {confirmation?.change ?? null}
            </FormControl.HelperText>
            <FormControl.ErrorMessage>
              {error?.change ?? null}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
    </Center>
  );
};
