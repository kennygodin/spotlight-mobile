import { User } from "./user.types";

export interface PostsResponse {
  status: string;
  message: string;
  data: {
    posts: Post[];
  };
}

export interface Post {
  id: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  user: User;
  _count?: {
    likes: number;
    comments: number;
  };
}

export interface CreatePostResponse {
  status: string;
  message: string;
  post: Post
}

export interface CreatePostPayload {
  imageUrl: string;
  content?: string;
}
