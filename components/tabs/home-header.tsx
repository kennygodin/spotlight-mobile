import { Text, View } from "react-native";
import { Link } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SignOutButton } from "@/components/tabs/signout-btn";

export default function HomeHeader() {
  return (
    <View className="flex-row justify-between items-center px-2 pt-8 pb-4 bg-black">
      <SignedIn>
        <Text className="font-jetbrains text-emerald-500 text-2xl">
          Spotlight
        </Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/signin">
          <Text className="text-white">Sign in</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
