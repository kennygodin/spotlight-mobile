import PostCard from "@/components/post/post-card";
import ProfileHeader from "@/components/tabs/profile-header";
import { useFetchUserPosts } from "@/hooks/useFetchUserPosts";
import { User } from "@/types/user.types";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileHeaderProps {
  user: User | null;
  postsCount: number;
  isLoading: boolean;
}

export default function UserProfile() {
  const { clerkId } = useLocalSearchParams<{ clerkId: string }>();

  const {
    data: userPosts,
    isLoading: userPostsLoading,
    error,
    refetch,
  } = useFetchUserPosts(clerkId!);

  const currentUser = userPosts?.[0]?.user || null;

  const ProfileHeaderComponent = ({
    user,
    postsCount,
    isLoading,
  }: ProfileHeaderProps) => {
    if (isLoading) {
      return (
        <View className="px-6 py-6 bg-black">
          <View className="flex-row justify-between items-center">
            <View className="w-24 h-24 rounded-full bg-slate-800" />

            <View className="flex-row items-center gap-8">
              <View className="items-center">
                <View className="w-8 h-6 bg-slate-800 rounded mb-1" />
                <Text className="text-slate-400 text-sm">Posts</Text>
              </View>
              <View className="items-center">
                <View className="w-8 h-6 bg-slate-800 rounded mb-1" />
                <Text className="text-slate-400 text-sm">Followers</Text>
              </View>
              <View className="items-center">
                <View className="w-8 h-6 bg-slate-800 rounded mb-1" />
                <Text className="text-slate-400 text-sm">Following</Text>
              </View>
            </View>
          </View>

          <View className="mt-4">
            <View className="w-32 h-5 bg-slate-800 rounded mb-2" />
            <View className="w-48 h-4 bg-slate-800 rounded mb-1" />
            <View className="w-24 h-4 bg-slate-800 rounded" />
          </View>

          <View className="flex-row mt-4 gap-2">
            <View className="flex-1 h-9 bg-slate-800 rounded-lg" />
            <View className="w-9 h-9 bg-slate-800 rounded-lg" />
          </View>
        </View>
      );
    }

    if (!user) {
      return (
        <View className="px-6 py-6 bg-black">
          <Text className="text-red-400 text-center">User not found</Text>
        </View>
      );
    }

    return (
      <View className="px-2 py-6 bg-black border-b border-slate-800">
        <View className="flex-row justify-between items-center">
          <View>
            <Image
              className="w-24 h-24 rounded-full"
              source={{
                uri:
                  user.imageUrl ||
                  "https://via.placeholder.com/150/666/fff?text=User",
              }}
            />
          </View>

          <View className="flex-row items-center gap-8">
            <View className="items-center">
              <Text className="text-xl font-bold text-white">{postsCount}</Text>
              <Text className="text-slate-400 text-sm">Posts</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-white">0</Text>
              <Text className="text-slate-400 text-sm">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-white">0</Text>
              <Text className="text-slate-400 text-sm">Following</Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-white text-lg font-semibold">
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.username || "User"}
          </Text>

          {user.username && (
            <Text className="text-sm text-slate-500 mt-1">
              @{user.username}
            </Text>
          )}

          {user.bio && (
            <Text className="text-sm text-slate-300 mt-2">{user.bio}</Text>
          )}
        </View>

        <View className="flex-row mt-4 gap-2">
          <TouchableOpacity className="flex-1 bg-slate-800 py-3 rounded-lg">
            <Text className="text-white text-center font-medium">Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-slate-800 px-4 py-3 rounded-lg">
            <Text className="text-white">•••</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (userPostsLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#22c55e" />
          <Text className="text-gray-400 mt-4">Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-400 text-center">
            Error loading user profile
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="mt-4 bg-slate-800 px-4 py-2 rounded-lg"
          >
            <Text className="text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProfileHeader />
      <FlatList
        data={userPosts || []}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ProfileHeaderComponent
            user={currentUser}
            postsCount={userPosts?.length || 0}
            isLoading={userPostsLoading}
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshing={userPostsLoading}
        onRefresh={() => {
          refetch();
        }}
        ListEmptyComponent={() => (
          <View className="items-center py-8">
            <Text className="text-gray-400">No posts found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
