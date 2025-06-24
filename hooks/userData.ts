import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL 

interface DatabaseUser {
  id: number;
  clerkId: string;
  email: string;
  name?: string;
  username?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
    followers: number;
    following: number;
  };
}

export const useUserData = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (clerkId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/sync?clerkId=${clerkId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setDbUser(data.user);
      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && clerkUser) {
      fetchUserData(clerkUser.id);
    } else if (isLoaded && !clerkUser) {
      setLoading(false);
      setDbUser(null);
    }
  }, [clerkUser, isLoaded]);

  const refreshUserData = () => {
    if (clerkUser) {
      setLoading(true);
      fetchUserData(clerkUser.id);
    }
  };

  return {
    clerkUser,
    dbUser,
    loading,
    error,
    refreshUserData,
    isAuthenticated: !!clerkUser && !!dbUser,
  };
};
