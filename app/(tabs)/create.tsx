import CreateHeader from "@/components/tabs/create-header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function Create() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  if (!selectedImage) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <CreateHeader
          selectedImage={false}
          isSubmitting={isSubmitting}
          setSelectedImage={setSelectedImage}
          onSubmit={() => {}}
        />
        <TouchableOpacity
          onPress={pickImage}
          className="flex-1 items-center justify-center gap-2"
        >
          <Ionicons name="image-outline" size={50} color="#4b5563" />
          <Text className="text-gray-600">Tap to select an image</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView className="flex-1">
        <CreateHeader
          selectedImage={true}
          isSubmitting={isSubmitting}
          setSelectedImage={setSelectedImage}
          onSubmit={() => {}}
        />

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          className="flex-grow"
        >
          <View className={`flex-1 ${isSubmitting ? "opacity-70" : ""}`}>
            <View className="relative">
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 8,
                }}
                resizeMode="cover"
                onError={(error) => {
                  console.log("Image load error:", error);
                }}
                onLoad={() => {
                  console.log("Image loaded successfully");
                }}
              />

              <TouchableOpacity
                onPress={pickImage}
                className="absolute bottom-2 right-2 flex-row items-center gap-1 bg-black/60 px-3 py-1 rounded-full"
              >
                <Ionicons name="image-outline" color="#fff" size={16} />
                <Text className="text-white text-sm">Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TextInput
              placeholder="Write a caption..."
              className="text-white"
              placeholderTextColor={"#1f2937"}
              multiline
              value={caption}
              onChangeText={(text) => setCaption(text)}
              editable={!isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
