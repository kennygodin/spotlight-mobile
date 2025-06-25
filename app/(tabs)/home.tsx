import PostCard from "@/components/post/post-card";
import Reels from "@/components/reels/reels";
import axiosInstance from "@/libs/axios.config";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

import { SafeAreaView, ScrollView } from "react-native";

export default function Home() {
  const { getToken } = useAuth();

  useEffect(() => {
    const protectedRoutes = async () => {
      try {
        const token = await getToken();

        if (!token) {
          return null;
        }

        const response = await axiosInstance.get("/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Protected data:", response.data);
      } catch (error) {
        console.log("Error fetching protected route:", error);
      }
    };

    protectedRoutes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        <Reels />
        {/* <PostCard />
        <PostCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
