import NotificationsCard from "@/components/notifications/notifications-card";
import NotificationsHeader from "@/components/tabs/notifications-header";
import { images } from "@/constants/images";

import { SafeAreaView, ScrollView } from "react-native";
export default function Notifications() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <NotificationsHeader />
      <ScrollView>
        <NotificationsCard
          profileImage={images.n1}
          actionImage={images.n3}
          performedBy="rhoda.emily"
          type="comments"
        />
        <NotificationsCard
          profileImage={images.n2}
          actionImage={images.n2}
          performedBy="kenmily_"
          type="following"
        />
        <NotificationsCard
          profileImage={images.n3}
          actionImage={images.n1}
          performedBy="jenny09"
          type="likes"
        />
        <NotificationsCard
          profileImage={images.n1}
          actionImage={images.n3}
          performedBy="rhoda.emily"
          type="comments"
        />
        <NotificationsCard
          profileImage={images.n2}
          actionImage={images.n2}
          performedBy="kenmily_"
          type="following"
        />
        <NotificationsCard
          profileImage={images.n3}
          actionImage={images.n1}
          performedBy="jenny09"
          type="likes"
        />
        <NotificationsCard
          profileImage={images.n1}
          actionImage={images.n3}
          performedBy="rhoda.emily"
          type="comments"
        />
        <NotificationsCard
          profileImage={images.n2}
          actionImage={images.n2}
          performedBy="kenmily_"
          type="following"
        />
        <NotificationsCard
          profileImage={images.n3}
          actionImage={images.n1}
          performedBy="jenny09"
          type="likes"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
