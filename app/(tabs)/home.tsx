import PostCard from "@/components/post/post-card";
import Reels from "@/components/reels/reels";
import HomeHeader from "@/components/tabs/home-header";
import { useFetchFeedPosts } from "@/hooks/useFetchFeedPosts";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function Home() {
  const {
    data: feedPosts,
    isLoading: feedPostLoading,
    error,
    refetch,
  } = useFetchFeedPosts();
  const { getToken } = useAuth();

  // useEffect(() => {
  //   const protectedRoutes = async () => {
  //     try {
  //       const token = await getToken();

  //       if (!token) {
  //         return null;
  //       }

  //       const response = await axiosInstance.get("/protected", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       console.log("Protected data:", response.data);
  //     } catch (error) {
  //       console.log("Error fetching protected route:", error);
  //     }
  //   };

  //   protectedRoutes();
  // }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <HomeHeader />
      {feedPostLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#22c55e" />
          <Text className="text-gray-400 mt-4">Loading posts feed...</Text>
        </View>
      ) : (
        <FlatList
          data={feedPosts || []}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Reels />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshing={feedPostLoading}
          onRefresh={() => {
            refetch();
          }}
          ListEmptyComponent={() => {
            if (feedPostLoading) {
              return (
                <View className="items-center py-8">
                  <ActivityIndicator size="large" color="#22c55e" />
                  <Text className="text-gray-400 mt-4">
                    Loading feed posts...
                  </Text>
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
                    Failed to load posts feed
                  </Text>
                  <Text className="text-gray-400 text-sm mt-1">
                    Pull to refresh
                  </Text>
                </View>
              );
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}
