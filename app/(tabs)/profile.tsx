import PostCard from "@/components/post/post-card";
import ProfileHeader from "@/components/tabs/profile-header";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { useUser, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData, updateProfileImage } from "@/services/user.service";
import { useFetchMyPosts } from "@/hooks/useFetchMyPosts";

export default function Profile() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const { data: myPosts, isLoading: myPostLoading, error } = useFetchMyPosts();

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(currentUser?.imageUrl);
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || "");
      setLastName(currentUser.lastName || "");
      setUsername(currentUser.username || "");
      setBio(currentUser.bio || "");
      setProfileImage(currentUser.imageUrl!);
    }
  }, [currentUser]);

  const updateProfileImageMutation = useMutation({
    mutationFn: async (imageUri: string) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token");

      const formData = new FormData();
      const filename = imageUri.split("/").pop() || "profile.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("image", {
        uri: imageUri,
        type: type,
        name: filename,
      } as any);

      return updateProfileImage(formData, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setSelectedImage(null);
      Alert.alert("Success", "Profile image updated successfully!");
    },
    onError: (error: any) => {
      console.error("Profile image update error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile image"
      );
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: {
      firstName?: string;
      lastName?: string;
      username?: string;
      bio?: string;
    }) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token");

      return updateUserData(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setEditProfileVisible(false);
      Alert.alert("Success", "Profile updated successfully!");
    },
    onError: (error: any) => {
      console.error("Profile update error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile"
      );
    },
  });

  const handleSaveProfile = () => {
    if (username && username.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters");
      return;
    }

    if (username && !/^[a-zA-Z0-9_]+$/.test(username)) {
      Alert.alert(
        "Error",
        "Username can only contain letters, numbers, and underscores"
      );
      return;
    }

    const updateData = {
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      username: username.trim() || undefined,
      bio: bio.trim() || undefined,
    };

    updateProfileMutation.mutate(updateData);
  };

  const handleSaveProfileImage = () => {
    if (!selectedImage) {
      Alert.alert("Error", "No image selected");
      return;
    }

    updateProfileImageMutation.mutate(selectedImage);
  };

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

  const ProfileHeaderComponent = () => {
    if (userLoading) {
      return (
        <View className="px-2 py-6">
          <View className="flex-row justify-between items-center">
            <View className="w-24 h-24 rounded-full bg-slate-800 animate-pulse" />

            <View className="flex-row items-center gap-6">
              <View className="items-center">
                <View className="w-8 h-8 bg-slate-800 rounded mb-1" />
                <Text className="text-slate-400">Posts</Text>
              </View>
              <View className="items-center">
                <View className="w-8 h-8 bg-slate-800 rounded mb-1" />
                <Text className="text-slate-400">Followers</Text>
              </View>
              <View className="items-center">
                <View className="w-8 h-8 bg-slate-800 rounded mb-1" />
                <Text className="text-slate-400">Following</Text>
              </View>
            </View>
          </View>

          <View className="mt-4">
            <View className="w-32 h-6 bg-slate-800 rounded mb-2" />
            <View className="w-48 h-4 bg-slate-800 rounded mb-1" />
            <View className="w-24 h-4 bg-slate-800 rounded" />
          </View>

          <View className="flex-row mt-3 gap-2">
            <View className="flex-1 h-10 bg-slate-800 rounded-md" />
            <View className="w-10 h-10 bg-slate-800 rounded-md" />
          </View>
        </View>
      );
    }

    return (
      <View className="px-2 py-6">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={pickImage}>
            <Image
              className="w-24 h-24 rounded-full"
              source={{ uri: profileImage }}
            />
            <View className="absolute bottom-0 right-0 bg-emerald-600 rounded-full p-1">
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </TouchableOpacity>
          <View className="flex-row items-center gap-6">
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">
                {myPosts?.length || 0}
              </Text>
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
            {currentUser?.firstName && currentUser?.lastName
              ? `${currentUser.firstName} ${currentUser.lastName}`
              : currentUser?.username || "User"}
          </Text>
          <Text className="text-sm text-slate-400">
            {currentUser?.bio || "No bio yet"}
          </Text>
          {currentUser?.username && (
            <Text className="text-sm text-slate-500">
              @{currentUser.username}
            </Text>
          )}
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
          <TouchableOpacity className="flex-row items-center justify-center bg-slate-800 w-max py-2 px-2 rounded-md">
            <Ionicons
              name="log-out-outline"
              size={20}
              color="white"
              className="-rotate-90"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (selectedImage) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-row items-center justify-between w-full px-4 py-4">
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Ionicons name="close" color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            Update Profile Picture
          </Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View className="flex-1 items-center justify-center px-4">
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
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
            className="mt-4 flex-row items-center gap-2 bg-slate-800 px-4 py-2 rounded-full"
          >
            <Ionicons name="camera" size={16} color="white" />
            <Text className="text-white">Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View className="px-4 pb-4">
          <TouchableOpacity
            onPress={handleSaveProfileImage}
            disabled={updateProfileImageMutation.isPending}
            className="flex-row items-center justify-center bg-emerald-600 w-full py-4 rounded-md"
          >
            {updateProfileImageMutation.isPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-semibold">Save Profile Picture</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProfileHeader />

      {userLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#22c55e" />
          <Text className="text-gray-400 mt-4">Loading profile...</Text>
        </View>
      ) : (
        <FlatList
          data={myPosts || []}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ProfileHeaderComponent}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshing={myPostLoading}
          onRefresh={() => {
            // You can add refetch logic here if your hook supports it
            // For example: refetch();
          }}
          ListEmptyComponent={() => {
            if (myPostLoading) {
              return (
                <View className="items-center py-8">
                  <ActivityIndicator size="large" color="#22c55e" />
                  <Text className="text-gray-400 mt-4">Loading posts...</Text>
                </View>
              );
            }

            if (error) {
              return (
                <View className="items-center py-8">
                  <Ionicons
                    name="alert-circle-outline"
                    size={48}
                    color="#ef4444"
                  />
                  <Text className="text-red-400 mt-2">
                    Failed to load posts
                  </Text>
                  <Text className="text-gray-400 text-sm mt-1">
                    Pull to refresh
                  </Text>
                </View>
              );
            }

            return (
              <View className="items-center py-8">
                <Ionicons name="image-outline" size={48} color="#64748b" />
                <Text className="text-gray-400 mt-2">No posts yet</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  Share your first post!
                </Text>
              </View>
            );
          }}
        />
      )}

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
          <View className="bg-zinc-900 rounded-t-2xl px-4 py-6">
            <View className="flex-row justify-between gap-2 mb-3">
              <Text className="text-white text-xl font-bold mb-4">
                Edit Profile
              </Text>
              <TouchableOpacity
                onPress={() => setEditProfileVisible(false)}
                disabled={updateProfileMutation.isPending}
              >
                <Ionicons name="close-outline" color="#fff" size={24} />
              </TouchableOpacity>
            </View>

            {userLoading ? (
              <View className="items-center py-4">
                <ActivityIndicator size="small" color="#22c55e" />
                <Text className="text-gray-400 mt-2">Loading profile...</Text>
              </View>
            ) : (
              <>
                <View>
                  <Text className="text-white mb-1">First Name</Text>
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#888"
                    className="bg-zinc-800 text-white rounded-md px-4 py-4 mb-3"
                    value={firstName}
                    onChangeText={setFirstName}
                    editable={!updateProfileMutation.isPending}
                  />
                </View>
                <View>
                  <Text className="text-white mb-1">Last Name</Text>
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#888"
                    className="bg-zinc-800 text-white rounded-md px-4 py-4 mb-3"
                    value={lastName}
                    onChangeText={setLastName}
                    editable={!updateProfileMutation.isPending}
                  />
                </View>
                <View>
                  <Text className="text-white mb-1">Username</Text>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#888"
                    className="bg-zinc-800 text-white rounded-md px-4 py-4 mb-3"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!updateProfileMutation.isPending}
                  />
                  {!currentUser?.username && (
                    <Text className="text-emerald-400 text-xs -mt-2 mb-3">
                      Username is required to create posts
                    </Text>
                  )}
                </View>

                <View>
                  <Text className="text-white mb-1">Bio</Text>
                  <TextInput
                    placeholder="Tell us about yourself..."
                    placeholderTextColor="#888"
                    className="bg-zinc-800 text-white rounded-md px-4 py-4 mb-3 h-[6rem]"
                    multiline
                    numberOfLines={3}
                    value={bio}
                    onChangeText={setBio}
                    editable={!updateProfileMutation.isPending}
                    style={{ textAlignVertical: "top" }}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                  className="flex-row items-center justify-center bg-emerald-600 w-full py-4 rounded-md mt-6"
                >
                  {updateProfileMutation.isPending ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white">Save Changes</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}