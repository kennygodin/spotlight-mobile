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

  // const logToken = async () => {
  //   try {
  //     const token = await getToken();
  //     console.log("JWT Token:", token);
  //     // Copy this token from your console
  //   } catch (error) {
  //     console.error("Error getting token:", error);
  //   }
  // };

  // // Call this function or add a button to trigger it
  // logToken();

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
