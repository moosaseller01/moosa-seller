import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const sendOTP = async (countryCode: string, phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate and store OTP (in real app, this would be sent via SMS)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const fullPhoneNumber = countryCode + phoneNumber;
    
    // Store OTP temporarily (expires in 5 minutes)
    const otpData = {
      otp,
      phoneNumber: fullPhoneNumber,
      timestamp: Date.now(),
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    };
    
    localStorage.setItem('pendingOTP', JSON.stringify(otpData));
    
    // In development, show OTP in console (remove in production)
    console.log(`OTP for ${fullPhoneNumber}: ${otp}`);
    alert(`Development Mode: Your OTP is ${otp}`);
    
    setIsLoading(false);
    return true;
  };

  const verifyOTP = async (countryCode: string, phoneNumber: string, otp: string, username?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const fullPhoneNumber = countryCode + phoneNumber;
    const pendingOTP = localStorage.getItem('pendingOTP');
    
    if (!pendingOTP) {
      setIsLoading(false);
      return false;
    }
    
    const otpData = JSON.parse(pendingOTP);
    
    // Check if OTP is valid and not expired
    if (otpData.otp !== otp || otpData.phoneNumber !== fullPhoneNumber || Date.now() > otpData.expires) {
      setIsLoading(false);
      return false;
    }
    
    // Clear pending OTP
    localStorage.removeItem('pendingOTP');
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let existingUser = users.find((u: any) => u.phoneNumber === fullPhoneNumber);
    
    if (existingUser) {
      // Existing user login
      const userData: User = {
        id: existingUser.id,
        phoneNumber: existingUser.phoneNumber,
        countryCode: existingUser.countryCode,
        username: existingUser.username,
        role: existingUser.role || 'user',
        createdAt: existingUser.createdAt,
        personalBroadcastId: existingUser.personalBroadcastId
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } else if (username) {
      // New user registration
      const newUserId = Date.now().toString();
      const personalBroadcastId = 'broadcast_' + newUserId;
      
      const newUser = {
        id: newUserId,
        phoneNumber: fullPhoneNumber,
        countryCode,
        username,
        role: fullPhoneNumber === '+923432252006' ? 'admin' : 'user', // Admin phone
        createdAt: new Date().toISOString(),
        personalBroadcastId
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Create personal broadcast for the user
      const chats = JSON.parse(localStorage.getItem('chats') || '[]');
      const personalBroadcast = {
        id: personalBroadcastId,
        participants: [newUserId],
        type: 'broadcast',
        name: 'My Status',
        createdBy: newUserId,
        isPersonal: true,
        updatedAt: new Date().toISOString()
      };
      
      chats.push(personalBroadcast);
      localStorage.setItem('chats', JSON.stringify(chats));
      
      const userData: User = {
        id: newUser.id,
        phoneNumber: newUser.phoneNumber,
        countryCode: newUser.countryCode,
        username: newUser.username,
        role: newUser.role,
        createdAt: newUser.createdAt,
        personalBroadcastId: newUser.personalBroadcastId
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('pendingOTP');
  };

  const value: AuthContextType = {
    user,
    sendOTP,
    verifyOTP,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};