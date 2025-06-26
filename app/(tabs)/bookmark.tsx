import PostCard from "@/components/post/post-card";
import BookmarkHeader from "@/components/tabs/bookmark-header";
import { SafeAreaView, ScrollView } from "react-native";

export default function Bookmark() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <BookmarkHeader />
      <ScrollView>
        {/* <PostCard />
        <PostCard />
        <PostCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
