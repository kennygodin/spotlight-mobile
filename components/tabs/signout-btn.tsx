import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Alert, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          Linking.openURL(Linking.createURL("/(auth)/signin"));
        },
      },
    ]);
  };
  return (
    <TouchableOpacity className="bg-transparent" onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={22} color="#fff" />
    </TouchableOpacity>
  );
};
