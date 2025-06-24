import axiosInstance from "@/libs/axios.config";
import { SyncUserPayload, User } from "@/types/user.types";

export const syncUser = async (user: SyncUserPayload): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>("/users/sync", user);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};
