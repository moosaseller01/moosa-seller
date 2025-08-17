export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface TikTokAccount {
  id: string;
  sellerId: string;
  username: string;
  followers: number;
  following: number;
  likes: number;
  videos: number;
  region: string;
  contentCategory: string;
  price: number;
  description: string;
  verificationStatus: 'verified' | 'unverified';
  accountAge: string;
  engagementRate: number;
  images: string[];
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}