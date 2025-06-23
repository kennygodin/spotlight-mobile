import { Text, View } from "react-native";
import { SignedIn } from "@clerk/clerk-expo";

export default function BookmarkHeader() {
  return (
    <View className="flex-row justify-between items-center px-2 pt-8 pb-4 bg-black">
      <SignedIn>
        <Text className="font-jetbrains text-emerald-500 text-2xl">
          Bookmark
        </Text>
      </SignedIn>
    </View>
  );
}
