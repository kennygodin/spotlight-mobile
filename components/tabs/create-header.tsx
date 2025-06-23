import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CreateHeaderProps {
  selectedImage: boolean;
  setSelectedImage: (value: null) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function CreateHeader({
  selectedImage,
  onSubmit,
  isSubmitting,
  setSelectedImage,
}: CreateHeaderProps) {
  const router = useRouter();

  if (selectedImage) {
    return (
      <View className="flex-row items-center justify-between px-4 py-4 border-b-[0.5px] border-gray-800">
        <TouchableOpacity
          disabled={isSubmitting}
          onPress={() => setSelectedImage(null)}
        >
          <Ionicons name="close-outline" color="#fff" size={24} />
        </TouchableOpacity>

        <Text className="text-white text-xl font-semibold">New Post</Text>

        <TouchableOpacity onPress={() => onSubmit()}>
          {isSubmitting ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <Text
              disabled={isSubmitting}
              className={`${!isSubmitting ? "text-emerald-600" : "text-gray-500"}`}
            >
              Share
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="flex-row items-center justify-between px-4 py-4 border-b-[0.5px] border-gray-800">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color="#22c55e" size={24} />
      </TouchableOpacity>

      <Text className="text-white text-xl font-semibold">New Post</Text>

      <View style={{ width: 24 }} />
    </View>
  );
}
