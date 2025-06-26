import { Post } from "@/types/post.types";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const { user } = useUser();

  const handleUserPress = () => {
    router.push(`/user/${post.user.clerkId}`);
  };

  return (
    <View className="bg-zinc-900 rounded-lg p-4 mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Image
            source={{
              uri:
                post.user.imageUrl ||
                user?.imageUrl ||
                "https://via.placeholder.com/40",
            }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <TouchableOpacity onPress={handleUserPress}>
            <Text className="text-white font-semibold">
              {post.user.firstName && post.user.lastName
                ? `${post.user.firstName} ${post.user.lastName}`
                : post.user.username ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
            </Text>
            {post.user.username && (
              <Text className="text-gray-400 text-sm">
                @{post.user.username}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => console.log("Options tapped!")}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {post.content && <Text className="text-white mb-3">{post.content}</Text>}

      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          className="w-full h-64 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity className="flex-row items-center mr-4">
            <Ionicons name="heart-outline" size={20} color="#9CA3AF" />
            <Text className="text-gray-400 ml-1">
              {post._count?.likes || 0} likes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
            <Text className="text-gray-400 ml-1">
              {post._count?.comments || 0} comments
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
