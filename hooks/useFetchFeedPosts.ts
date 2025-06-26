import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { getFeedPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";

export const useFetchFeedPosts = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["feed-posts"],
    queryFn: async (): Promise<Post[]> => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token");
      }
      const response = await getFeedPosts(token);
      return response.data.posts;
    },
    enabled: isSignedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
