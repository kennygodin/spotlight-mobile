import { Text, View } from "react-native";
import { SignOutButton } from "@/components/tabs/signout-btn";

export default function ProfileHeader() {
  return (
    <View className="flex-row items-center justify-between px-4 py-4 border-b-[0.5px] border-gray-800">
      <Text className="text-white text-xl font-semibold">Barukok</Text>
      <SignOutButton />
    </View>
  );
}
