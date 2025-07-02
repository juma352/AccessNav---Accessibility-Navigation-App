import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccessibility } from './AccessibilityContext';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  county: string;
  subcounty?: string;
  ward?: string;
  ncpwdRegistered: boolean;
  ncpwdNumber?: string;
  profileComplete: boolean;
  createdAt: Date;
  lastLogin: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  county: string;
  subcounty?: string;
  ward?: string;
  ncpwdRegistered: boolean;
  ncpwdNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
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
  const { speak } = useAccessibility();

  // Kenya counties for validation
  const kenyanCounties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay',
    'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii',
    'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
    'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi',
    'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
    'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

  useEffect(() => {
    // Check for existing session on app load
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('accessnav_user');
        const sessionToken = localStorage.getItem('accessnav_token');
        
        if (savedUser && sessionToken) {
          const userData = JSON.parse(savedUser);
          // Convert date strings back to Date objects
          userData.createdAt = new Date(userData.createdAt);
          userData.lastLogin = new Date(userData.lastLogin);
          
          // In a real app, validate the token with the server
          setUser(userData);
          speak('Welcome back to AccessNav Kenya');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessnav_user');
        localStorage.removeItem('accessnav_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [speak]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }
      
      if (!email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }
      
      // Mock user data
      const userData: User = {
        id: Date.now().toString(),
        email,
        name: 'John Doe', // In real app, this comes from server
        county: 'Nairobi',
        ncpwdRegistered: false,
        profileComplete: true,
        createdAt: new Date(),
        lastLogin: new Date(),
        emailVerified: true,
        phoneVerified: false
      };
      
      // Save to localStorage (in real app, save secure token)
      localStorage.setItem('accessnav_user', JSON.stringify(userData));
      localStorage.setItem('accessnav_token', 'mock_jwt_token_' + Date.now());
      
      setUser(userData);
      speak('Successfully logged in to AccessNav Kenya');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validation
      if (!userData.email || !userData.password || !userData.name || !userData.county) {
        return { success: false, error: 'Please fill in all required fields' };
      }
      
      if (!userData.email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      if (userData.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }
      
      if (!kenyanCounties.includes(userData.county)) {
        return { success: false, error: 'Please select a valid Kenyan county' };
      }
      
      if (userData.ncpwdRegistered && !userData.ncpwdNumber) {
        return { success: false, error: 'NCPWD number is required if you are registered' };
      }
      
      // Create user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        county: userData.county,
        subcounty: userData.subcounty,
        ward: userData.ward,
        ncpwdRegistered: userData.ncpwdRegistered,
        ncpwdNumber: userData.ncpwdNumber,
        profileComplete: false, // Will be completed in accessibility setup
        createdAt: new Date(),
        lastLogin: new Date(),
        emailVerified: false,
        phoneVerified: false
      };
      
      // Save to localStorage
      localStorage.setItem('accessnav_user', JSON.stringify(newUser));
      localStorage.setItem('accessnav_token', 'mock_jwt_token_' + Date.now());
      
      setUser(newUser);
      speak('Account created successfully. Welcome to AccessNav Kenya!');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessnav_user');
    localStorage.removeItem('accessnav_token');
    setUser(null);
    speak('You have been logged out of AccessNav Kenya');
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      speak('Password reset instructions sent to your email');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to send reset email. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!token || !password) {
        return { success: false, error: 'Invalid reset token or password' };
      }
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }
      
      speak('Password reset successfully');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Password reset failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        localStorage.setItem('accessnav_user', JSON.stringify(updatedUser));
        speak('Email verified successfully');
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Email verification failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('accessnav_user', JSON.stringify(updatedUser));
        speak('Profile updated successfully');
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.removeItem('accessnav_user');
      localStorage.removeItem('accessnav_token');
      setUser(null);
      speak('Account deleted successfully');
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Account deletion failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    updateProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};