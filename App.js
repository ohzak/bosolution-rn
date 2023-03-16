import React, { useState } from "react";
import {
  Text,
  Link,
  FormControl,
  HStack,
  Center,
  Input,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Button,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";
import { Login } from "./pages/Login";
import { LanguageProvider } from "./translations/translationContext";
import { ThemeProvider } from "./theme/themeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationProvider } from "./navigation/navigation";
import AppLoading from "expo-app-loading";
import { fetchFonts } from "./theme/loadFonts";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {fontsLoaded ? (
          <AuthProvider>
            <NavigationProvider />
          </AuthProvider>
        ) : (
          <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={(error) => console.log(error)}
          />
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}


