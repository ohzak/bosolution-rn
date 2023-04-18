import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  Switch,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import NativeBaseIcon from "../components/NativeBaseIcon";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../pages/User/Home";
import Documents from "../pages/User/Documents";

const UserDrawer = createDrawerNavigator();

export const UserDrawerScreen = () => {
  return (
    <UserDrawer.Navigator screenOptions={{ drawerPosition: "left" }}>
      <UserDrawer.Screen name="Home" component={Home} />
      <UserDrawer.Screen name="Documents" component={Documents} />
    </UserDrawer.Navigator>
  );
};
