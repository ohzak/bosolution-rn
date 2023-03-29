import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { GooglePlaces } from "../pages/GooglePlaces";
import { Validation } from "../pages/Validation";

const Stack = createNativeStackNavigator();

export const NavigationProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // schermate per utenti loggati
          user.roles.includes("valid") ? (
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
            <Stack.Screen name="Google" component={GooglePlaces} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
