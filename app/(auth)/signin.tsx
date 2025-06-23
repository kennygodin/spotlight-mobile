import { Image, Text, TouchableOpacity, View } from "react-native";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";

import { images } from "@/constants/images";
import { useRouter } from "expo-router";

export default function SigninScreen() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    JetBrainsMono: require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleGoogleSignOn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/home");
      }
    } catch (error) {
      console.log("OAuth Error", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-10 bg-black">
      <View>
        <View className="w-16 h-16 rounded-2xl flex bg-emerald-400/15 items-center justify-center mb-6">
          <Ionicons name="leaf" size={40} color="#22c55e" />
        </View>
      </View>
      <Text className="text-4xl font-jetbrains text-emerald-500">
        Spotlight
      </Text>
      <Text className="text-lg tracking-widest text-gray-400 mt-6">
        Meet new people around the world
      </Text>

      <View className="w-[300px] h-[300px]">
        <Image
          source={images.auth}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity
        onPress={handleGoogleSignOn}
        className="flex-row items-center justify-center bg-white w-full py-4 rounded-2xl mt-6"
      >
        <Ionicons name="logo-google" size={30} color="black" />
        <Text className="text-xl text-primary ml-4 font-medium">
          Continue with Google
        </Text>
      </TouchableOpacity>

      <Text className="text-sm text-gray-400 mt-6 text-center px-10">
        By continuing, you agree to our{" "}
        <Text className="text-emerald-500">Terms of Service</Text> and{" "}
        <Text className="text-emerald-500">Privacy Policy</Text>
      </Text>
    </View>
  );
}
