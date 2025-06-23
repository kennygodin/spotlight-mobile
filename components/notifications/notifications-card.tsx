import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface NotificationsCardProps {
  type: "likes" | "comments" | "following";
  performedBy: string;
  profileImage: ImageSourcePropType;
  actionImage: ImageSourcePropType;
}
const NotificationsCard = ({
  type,
  performedBy,
  profileImage,
  actionImage,
}: NotificationsCardProps) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-2 py-2">
      <View className="flex-row gap-2 items-center">
        <View className="w-12 h-12 relative">
          <Image
            source={profileImage}
            className="w-full h-full rounded-full object-cover"
          />
          <View className="absolute -bottom-2 right-0 p-0.5 items-center justify-center border-[1px] border-slate-600 bg-black rounded-full">
            <Ionicons
              className=""
              name={
                type === "comments"
                  ? "chatbubble"
                  : type === "likes"
                    ? "heart"
                    : "person-add"
              }
              size={18}
              color={
                type === "comments"
                  ? "royalblue"
                  : type === "likes"
                    ? "green"
                    : "indigo"
              }
            />
          </View>
        </View>
        <View>
          <Text className="text-white font-bold">{performedBy}</Text>
          <Text className="text-slate-300 text-sm">
            {type === "comments"
              ? "Commented on your post"
              : type === "likes"
                ? "Liked your post"
                : "Followed you"}
          </Text>
          <Text className="text-slate-600 text-sm">8 hours ago</Text>
        </View>
      </View>
      <View className="w-12 h-12">
        <Image
          source={actionImage}
          className="w-full h-full rounded-lg object-cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default NotificationsCard;
