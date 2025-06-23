import "./global.css";

import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Slot />
      <StatusBar style="light" />
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
    </ClerkProvider>
  );
}
