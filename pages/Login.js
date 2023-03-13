import { useContext } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  View,
  VStack,
} from "native-base";
import { LanguageContext } from "../translations/translationContext";
import { Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native-web";

export function Login({ navigation }) {
  const { i18n } = useContext(LanguageContext);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{
        backgroundColor: "#2e88a0",
        flex: "1",
        justifyContent: "center",
      }}
    >
      <Center h="60%">
        <Box
          px={6}
          w="90%"
          maxW="400"
          h="80%"
          variant="main"
          style={{ justifyContent: "center" }}
        >
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
              <Input
                InputLeftElement={
                  <Feather
                    name="mail"
                    size={16}
                    color={"grey"}
                    style={{ marginStart: "8px" }}
                  />
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{i18n.t("password")}</FormControl.Label>
              <Input
                type="password"
                InputLeftElement={
                  <Feather
                    name="lock"
                    color={"grey"}
                    size={16}
                    style={{ marginStart: "8px" }}
                  />
                }
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "primary.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                {i18n.t("password_forgot_question")}
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="primary">
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
                  color: "primary.500",
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
    </ImageBackground>
  );
}
