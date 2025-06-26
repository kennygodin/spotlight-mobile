import { Text, View } from "react-native";

export default function NotificationsHeader() {
  return (
    <View className="flex-row items-center justify-between px-4 pb-4 border-b-[0.5px] border-gray-800">
      <Text className="font-jetbrains text-emerald-500 text-2xl">
        Notifications
      </Text>
    </View>
  );
}
