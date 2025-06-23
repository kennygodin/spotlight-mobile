import PostCard from "@/components/post/post-card";
import { SafeAreaView, ScrollView } from "react-native";

export default function Bookmark() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        <PostCard />
        <PostCard />
        <PostCard />
      </ScrollView>
    </SafeAreaView>
  );
}
