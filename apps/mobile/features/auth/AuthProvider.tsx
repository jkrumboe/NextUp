import type { User, RegisterDto, LoginDto, AuthResponse } from '@vibelink/types';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { api } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for secure storage that work on web too
const getItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
};

const setItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const deleteItem = async (key: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getItem('accessToken');
      if (token) {
        const { data } = await api.get<User>('/users/me');
        setUser(data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens
      await deleteItem('accessToken');
      await deleteItem('refreshToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginDto) => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    await setItem('accessToken', data.accessToken);
    await setItem('refreshToken', data.refreshToken);
    setUser(data.user);
  };

  const register = async (credentials: RegisterDto) => {
    const { data } = await api.post<AuthResponse>('/auth/register', credentials);
    await setItem('accessToken', data.accessToken);
    await setItem('refreshToken', data.refreshToken);
    setUser(data.user);
  };

  const logout = async () => {
    await deleteItem('accessToken');
    await deleteItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
