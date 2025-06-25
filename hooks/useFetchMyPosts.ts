import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { getLoggedInUserPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";

export const useFetchMyPosts = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["fetchPosts"],
    queryFn: async (): Promise<Post[]> => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token");
      }
      const response = await getLoggedInUserPosts(token);
      return response.data.posts;
    },
    enabled: isSignedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
