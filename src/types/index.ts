export interface User {
  id: string;
  phoneNumber: string;
  countryCode: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: string;
  personalBroadcastId?: string;
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
  sendOTP: (countryCode: string, phoneNumber: string) => Promise<boolean>;
  verifyOTP: (countryCode: string, phoneNumber: string, otp: string, username?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image';
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  type: 'direct' | 'broadcast';
  name?: string;
  createdBy?: string;
  isPersonal?: boolean;
  lastMessage?: Message;
  updatedAt: string;
}