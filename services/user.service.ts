import axiosInstance from "@/libs/axios.config";
import { User, UserResponse } from "@/types/user.types";

export const getCurrentUser = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};
export const updateUserData = async (
  userData: Partial<User>,
  token: string
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.put("/users/update-user", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};

export const updateProfileImage = async (
  formData: FormData,
  token: string
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.put(
      "/users/update-user-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
