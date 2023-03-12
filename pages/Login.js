import { useContext } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import { LanguageContext } from "../translations/translationContext";

export function Login({ navigation }) {
  const { i18n } = useContext(LanguageContext);

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          {i18n.t("welcome")}
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          {i18n.t("signin_continue")}
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>{i18n.t("email")}</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>{i18n.t("password")}</FormControl.Label>
            <Input type="password" />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              {i18n.t("password_forgot_question")}
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            {i18n.t("sign_in")}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
