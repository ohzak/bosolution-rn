import { View } from "native-base";
import { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../config";
import { LanguageContext } from "../translations/translationContext";
import Constants from "expo-constants";

export const GooglePlaces = ({ navigation }) => {
  const { locale } = useContext(LanguageContext);
  return (
    <View mt={Constants.statusBarHeight} height={"100%"}>
      <GooglePlacesAutocomplete
        placeholder="search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: locale,
        }}
      />
    </View>
  );
};
