import PostCard from "@/components/post/post-card";
import Reels from "@/components/reels/reels";

import { SafeAreaView, ScrollView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        <Reels />
        <PostCard />
        <PostCard />
      </ScrollView>
    </SafeAreaView>
  );
}
