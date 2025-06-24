export interface SyncUserPayload {
  email: string;
  name: string;
  clerkId: string;
  avatar: string;
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SyncUserResponse extends User {}
