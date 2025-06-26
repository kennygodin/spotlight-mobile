import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileHeader() {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between px-4 pb-4 border-b-[0.5px] border-gray-800">
      <Text className="text-white text-xl font-semibold">Barukok</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
}
