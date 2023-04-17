import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/Registration/SignUp_User";
import { Home } from "../pages/Home";
import { GooglePlaces } from "../pages/GooglePlaces";
import { Validation } from "../pages/Validation";
import { SignUp_Address } from "../pages/Registration/SignUp_Address";

const Stack = createNativeStackNavigator();

export const NavigationProvider = ({ children }) => {
  const { user, roles, isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {isAuthenticated ? (
          // schermate per utenti loggati
          roles?.includes("Valid") ? (
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Validation" component={Validation} />
            </Stack.Group>
          )
        ) : (
          // schermate per utenti non loggati
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignUp_Address" component={SignUp_Address} />
            <Stack.Screen name="Google" component={GooglePlaces} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
