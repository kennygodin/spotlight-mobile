import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { getCurrentUser } from "@/services/user.service";
import { User } from "@/types/user.types";

export const useCurrentUser = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User> => {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token");
      }
      const response = await getCurrentUser(token);
      return response.user;
    },
    enabled: isSignedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
