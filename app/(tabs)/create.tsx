import CreateHeader from "@/components/tabs/create-header";
import { CreatePostPayload } from "@/types/post.types";
import { createPost } from "@/services/post.service";

import { QueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { useUsernameCheck } from "@/hooks/useUsernameCheck";

export default function Create() {
  const { getToken } = useAuth();
  const router = useRouter();
  const queryClient = new QueryClient();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    hasUsername,
    needsUsername,
    isLoading: userLoading,
  } = useUsernameCheck();
  const [caption, setCaption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(needsUsername)
    if (!userLoading && needsUsername) {
      Alert.alert(
        "Complete Your Profile",
        "Please set up your username before creating posts.",
        [
          {
            text: "Set Up Profile",
            onPress: () => router.push("/profile"),
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => router.back(),
          },
        ]
      );
    }
  }, [needsUsername, userLoading, router]);

  const pickImage = async () => {
    if (needsUsername) {
      Alert.alert("Profile Incomplete", "Please complete your profile first.", [
        {
          text: "Go to Profile",
          onPress: () => router.push("/profile"),
        },
      ]);
      return;
    }

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

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostPayload) => {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();

      if (data.content) {
        formData.append("content", data.content);
      }

      if (data.imageUrl) {
        const imageUri = data.imageUrl;
        const filename = imageUri.split("/").pop() || "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("image", {
          uri: imageUri,
          type: type,
          name: filename,
        } as any);
      }

      return await createPost(formData, token);
    },
    onSuccess: (response) => {
      console.log("Post created successfully:", response);
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      setSelectedImage(null);
      setCaption("");
      setIsSubmitting(false);
      router.push("/home");
    },
    onError: (error: unknown) => {
      setIsSubmitting(false);

      if (error instanceof Error) {
        if ((error as AxiosError)?.isAxiosError) {
          const axiosErr = error as AxiosError<{ message?: string }>;
          console.log("Axios error:", axiosErr);
          Alert.alert(
            "Error",
            axiosErr.response?.data?.message || "Failed to create post"
          );
          return;
        }
      }

      console.log("Unknown error:", error);
      Alert.alert("Error", "Something went wrong while creating the post!");
    },
  });

  const handleSubmit = () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    setIsSubmitting(true);

    const postData: CreatePostPayload = {
      imageUrl: selectedImage,
      content: caption.trim() || undefined,
    };

    createPostMutation.mutate(postData);
  };

  if (!selectedImage) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <CreateHeader
          selectedImage={false}
          isSubmitting={isSubmitting}
          setSelectedImage={setSelectedImage}
          onSubmit={handleSubmit}
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
          onSubmit={handleSubmit}
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
                disabled={isSubmitting}
                className="absolute bottom-2 right-2 flex-row items-center gap-1 bg-black/60 px-3 py-1 rounded-full"
              >
                <Ionicons name="image-outline" color="#fff" size={16} />
                <Text className="text-white text-sm">Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="p-4">
            <TextInput
              placeholder="Write a caption..."
              className="text-white text-base min-h-[100px]"
              placeholderTextColor={"#9ca3af"}
              multiline
              value={caption}
              onChangeText={(text) => setCaption(text)}
              editable={!isSubmitting && hasUsername}
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
