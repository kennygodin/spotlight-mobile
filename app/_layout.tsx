import "./global.css";

import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <StatusBar style="light" />
        {/* <Stack screenOptions={{ headerShown: false }} /> */}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
