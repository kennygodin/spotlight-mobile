import { FlatList, View } from "react-native";
import { reelData } from "@/data";
import { ReelCard } from "./reel-card";
export default function Reels() {
  const data = reelData;
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ReelCard source={item.url} />}
        horizontal
        className="border-y border-gray-900 py-4"
        contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
      />
    </View>
  );
}
