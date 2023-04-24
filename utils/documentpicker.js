import DocumentPicker from "expo-document-picker";
import ImagePicker from "expo-document-picker";

export const pickDocument = async () => {
  let result = await DocumentPicker.getDocumentAsync({});
  return result;
};

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  return result;
};
