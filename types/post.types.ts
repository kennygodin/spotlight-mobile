export interface CreatePostResponse {
  status: string;
  message: string;
  post: {
    id: string;
    imageUrl: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    publicId: string;
  };
}

export interface CreatePostPayload {
  imageUrl: string;
  content?: string;
}
