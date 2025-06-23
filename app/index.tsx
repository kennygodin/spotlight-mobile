import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/(auth)/signin" />;
}
