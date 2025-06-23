import PostCard from "@/components/post/post-card";
import ProfileHeader from "@/components/tabs/profile-header";

import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { user } = useUser();

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

  if (selectedImage) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <View className="flex-row items-center justify-between w-full px-4 py-4">
          <View style={{ width: 24 }} />

          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Ionicons name="close" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
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
          onPress={() => ({})}
          className="flex-row items-center justify-center bg-emerald-600 w-full py-4 rounded-md mt-6"
        >
          <Text className="text-white">Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        <ProfileHeader />
        <View className="px-2 py-6">
          <View className="flex-row justify-between items-center">
            <Image
              className="w-24 h-24 rounded-full"
              source={{ uri: user?.imageUrl }}
            />
            <View className="flex-row items-center gap-6">
              <View className="items-center">
                <Text className="text-2xl font-bold text-white">2</Text>
                <Text className="text-slate-400">Posts</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-white">0</Text>
                <Text className="text-slate-400">Followers</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-white">0</Text>
                <Text className="text-slate-400">Following</Text>
              </View>
            </View>
          </View>
          <View className="text-white mt-2">
            <Text className="text-white text-lg font-semibold">
              Barouke Fidele
            </Text>
            <Text className="text-sm text-slate-400">Backend Developer</Text>
          </View>

          <View className="flex-row mt-3 gap-2">
            <TouchableOpacity
              onPress={() => setEditProfileVisible(true)}
              className="flex-row items-center justify-center bg-slate-800 flex-1 py-2 rounded-md"
            >
              <Text className="text-base text-white ml-4 font-bold">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center justify-center bg-slate-800 w-max py-2 px-2 rounded-md"
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color="white"
                className="-rotate-90"
              />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={editProfileVisible}
            onRequestClose={() => setEditProfileVisible(false)}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1 justify-end bg-black/40"
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                }}
                keyboardShouldPersistTaps="handled"
              >
                <View className="bg-zinc-900 rounded-t-2xl px-4 py-6">
                  <View className="flex-row justify-between gap-2 mb-3">
                    <Text className="text-white text-xl font-bold mb-4">
                      Edit Profile
                    </Text>
                    <TouchableOpacity
                      onPress={() => setEditProfileVisible(false)}
                    >
                      <Ionicons name="close-outline" color="#fff" size={24} />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text className="text-white mb-1">Name</Text>
                    <TextInput
                      placeholder="Name"
                      placeholderTextColor="#888"
                      className="bg-zinc-800 text-white rounded-md px-4 py-4 mb-3"
                      defaultValue=""
                    />
                  </View>

                  <View>
                    <Text className="text-white mb-1">Bio</Text>
                    <TextInput
                      placeholder="Bio"
                      placeholderTextColor="#888"
                      className="bg-zinc-800 text-white rounded-md px-4 py-4 mb-3 h-[6rem]"
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => setEditProfileVisible(false)}
                    className="flex-row items-center justify-center bg-emerald-600 w-full py-4 rounded-md mt-6"
                  >
                    <Text className="text-white">Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>

          <View className="mt-2">
            <PostCard />
            <PostCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
