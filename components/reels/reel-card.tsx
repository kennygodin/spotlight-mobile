import { Image, TouchableOpacity, View } from "react-native";

interface ReelCardProps {
  source: any;
}

export const ReelCard = ({ source }: ReelCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Pressed!");
      }}
    >
      <View className="w-[60px] h-[60px] border-2 border-gray-200 p-1 rounded-full overflow-hidden">
        <Image source={source} className="w-full h-full rounded-full" />
      </View>
    </TouchableOpacity>
  );
};
