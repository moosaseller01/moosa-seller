import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';
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
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Initialize reCAPTCHA verifier
    const initRecaptcha = () => {
      if (!recaptchaVerifier) {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
          }
        });
        setRecaptchaVerifier(verifier);
      }
    };

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        const phoneNumber = firebaseUser.phoneNumber || '';
        
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        let existingUser = users.find((u: any) => u.phoneNumber === phoneNumber);
        
        if (existingUser) {
          // Existing user
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
        } else {
          // New user - will be handled in verifyOTP
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem('user');
      }
      setIsLoading(false);
    });

    initRecaptcha();

    return () => {
      unsubscribe();
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, []);

  const sendOTP = async (countryCode: string, phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const fullPhoneNumber = countryCode + phoneNumber;
      
      if (!recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized');
      }

      // Send SMS using Firebase
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      
      setIsLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      setIsLoading(false);
      
      // Reset reCAPTCHA on error
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
          }
        });
        setRecaptchaVerifier(verifier);
      }
      
      return false;
    }
  };

  const verifyOTP = async (countryCode: string, phoneNumber: string, otp: string, username?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (!confirmationResult) {
        setIsLoading(false);
        return false;
      }

      // Verify the OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      
      if (firebaseUser) {
        const fullPhoneNumber = firebaseUser.phoneNumber || (countryCode + phoneNumber);
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        let existingUser = users.find((u: any) => u.phoneNumber === fullPhoneNumber);
        
        if (existingUser) {
          // Existing user login - Firebase auth state will handle this
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
      }
      
      setIsLoading(false);
      return false;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setConfirmationResult(null);
      localStorage.removeItem('user');
      
      // Reset reCAPTCHA
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
          }
        });
        setRecaptchaVerifier(verifier);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
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