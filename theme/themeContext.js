import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export const ThemeProvider = ({ children }) => {
  useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const theme = extendTheme({
    fontConfig: {
      Inter: {
        100: {
          normal: "Inter_100Thin",
        },
        200: {
          normal: "Inter_200ExtraLight",
        },
        300: {
          normal: "Inter_300Light",
        },
        400: {
          normal: "Inter_400Regular",
        },
        500: {
          normal: "Inter_500Medium",
        },
        600: {
          normal: "Inter_600SemiBold",
        },
        700: {
          normal: "Inter_700Bold",
        },
        800: {
          normal: "Inter_800ExtraBold",
        },
        900: { normal: "Inter_900Black" },
      },
    },
    colors: {
      // Add new color
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    config: {
      // Changing initialColorMode to 'light'
      initialColorMode: "light",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "Inter",
    },
  });

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};
