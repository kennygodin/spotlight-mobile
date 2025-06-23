import { useUser } from "@clerk/clerk-expo";

import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PostCard() {
  const { user } = useUser();
  return (
    <View className="py-2">
      <View className="flex-row items-center px-1">
        <View className="flex-row items-center gap-x-2">
          <View className="w-10 h-10 rounded-full overflow-hidden">
            <Image source={{ uri: user?.imageUrl }} className="w-full h-full" />
          </View>
          <Text className="text-white font-bold">
            {user?.emailAddresses[0].emailAddress.split("@")[0]}
          </Text>
        </View>
        <TouchableOpacity
          className="ml-auto"
          onPress={() => console.log("Options tapped!")}
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="w-full h-80 my-2">
        <Image
          className="w-full h-full"
          source={{
            uri: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </View>
      <View className="flex-row gap-x-4 items-center px-1">
        <Ionicons name="heart" size={24} color="#fff" />
        <Ionicons name="chatbubble-outline" size={24} color="#fff" />
        <Ionicons name="bookmark" size={24} color="#fff" className="ml-auto" />
      </View>
      <View className="gap-y-1 px-1 mt-2">
        <Text className="text-white">2 likes</Text>
        <Text className="text-sm text-gray-400">about 2 hours ago</Text>
      </View>
    </View>
  );
}
