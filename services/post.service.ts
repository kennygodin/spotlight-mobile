import axiosInstance from "@/libs/axios.config";
import { CreatePostResponse } from "@/types/post.types";

export const createPost = async (
  data: FormData,
  token: string
): Promise<CreatePostResponse> => {
  try {
    const response = await axiosInstance.post<CreatePostResponse>(
      "/posts/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};
