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

export const Validation = ({ navigator }) => {
  const { i18n, locale } = useContext(LanguageContext);
  const { user, validate } = useContext(AuthContext);
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
          {i18n.t("validate")}
        </Heading>
        <Text>{}</Text>
        <Text>{user.email}</Text>
        <Text>{}</Text>
        <Button>
          <Text>{i18n.t("change_email")}</Text>
        </Button>
      </Box>
    </Center>
  );
};
