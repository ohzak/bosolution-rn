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
import { ImageBackground } from "react-native";

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
        50: "#E3F3FA",
        100: "#B9E1F3",
        200: "#8FD0EC",
        300: "#65BEE5",
        400: "#3CAEDF",
        500: "#2394B2",
        600: "#2e88a0",
        700: "#1F5669",
        800: "#173D4D",
        900: "#0E2332",
      },
      warning: {
        50: "#FFF5E5",
        100: "#FFE1B8",
        200: "#FFCD8A",
        300: "#FFB65D",
        400: "#FFA033",
        500: "#FF8C0A",
        600: "#E67800",
        700: "#B36200",
        800: "#804C00",
        900: "#4F2D00",
      },
      danger: {
        50: "#FEE3E3",
        100: "#FCC5C5",
        200: "#FAA7A7",
        300: "#F88989",
        400: "#F66B6B",
        500: "#F44D4D",
        600: "#E03F3F",
        700: "#A62F2F",
        800: "#802626",
        900: "#5A1D1D",
      },
      success: {
        50: "#E3F8F2",
        100: "#B9EEDF",
        200: "#8FE4CC",
        300: "#65DAB9",
        400: "#3CD0A6",
        500: "#2EB08C",
        600: "#279A7A",
        700: "#1F6C4E",
        800: "#174F38",
        900: "#0E321F",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    components: {
      Button: {
        defaultProps: {
          colorScheme: "primary",
        },
      },
      Box: {
        variants: {
          main: {
            rounded: "xl",
            backgroundColor: "white",
          },
        },
      },
    },
    config: {
      // Changing initialColorMode to 'light'
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "Inter",
    },
  });

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};
