import axiosInstance from "@/libs/axios.config";
import { CreatePostResponse, PostsResponse } from "@/types/post.types";

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

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};

// export const getLoggedInUserPosts = async (
//   token: string
// ): Promise<PostsResponse> => {
//   try {
//     const response = await axiosInstance.get<PostsResponse>(`/posts/my-posts`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching my posts:", error);
//     throw new Error("Failed to fetch posts");
//   }
// };

export const getUserPosts = async (
  clerkId: string,
  token: string
): Promise<PostsResponse> => {
  try {
    const response = await axiosInstance.get<PostsResponse>(
      `/posts/user/${clerkId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
};

export const getFeedPosts = async (token: string): Promise<PostsResponse> => {
  try {
    const response = await axiosInstance.get<PostsResponse>(
      `/posts/feed-posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching my posts:", error);
    throw new Error("Failed to fetch posts");
  }
};
