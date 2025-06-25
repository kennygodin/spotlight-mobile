import { useCurrentUser } from "./useCurrentUser";

export const useUsernameCheck = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  const hasUsername = Boolean(user?.username);
  const needsUsername = user && !hasUsername;

  return {
    user,
    hasUsername,
    needsUsername,
    isLoading,
    error,
  };
};
