import { useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { LanguageContext } from "../translations/translationContext";
import { AuthContext } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native";

export function Login({ navigation }) {
  const initialState = {
    password: null,
    email: null,
  };
  const [formData, setFormData] = useState(initialState);

  const { i18n } = useContext(LanguageContext);
  const { login } = useContext(AuthContext);

  const Signin = () => {
    login(formData.email, formData.password);
  };

  return (
    <Center>
      <Box safeArea p="2" w="90%" maxW="400" py="8" bg={"white"} rounded={"xl"}>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          alignSelf="center"
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
          alignSelf="center"
        >
          {i18n.t("signin_continue")}
        </Heading>

        <VStack space={3} mx="5" mt="10">
          <FormControl>
            <FormControl.Label>{i18n.t("email")}</FormControl.Label>
            <Input
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
              }
              InputLeftElement={
                <Icon
                  as={Feather}
                  name="mail"
                  color={"grey"}
                  size={"sm"}
                  ml={2}
                />
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{i18n.t("password")}</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) =>
                setFormData({ ...formData, password: value })
              }
              InputLeftElement={
                <Icon
                  as={Feather}
                  name="lock"
                  color={"grey"}
                  size={"sm"}
                  ml={2}
                />
              }
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "primary.500",
              }}
              mt="1"
            >
              {i18n.t("password_forgot_question")}
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="primary" onPress={() => Signin()}>
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
  );
}
