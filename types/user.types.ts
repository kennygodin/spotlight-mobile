export interface User {
  id: string;
  clerkId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  user: User;
  status: string;
  message: string;
}
