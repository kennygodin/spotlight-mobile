import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { getUserPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";

export const useFetchUserPosts = (clerkId: string) => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["userPosts", clerkId],
    queryFn: async (): Promise<Post[]> => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token");
      }
      const response = await getUserPosts(clerkId, token);
      return response.data.posts;
    },
    enabled: isSignedIn && !!clerkId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
