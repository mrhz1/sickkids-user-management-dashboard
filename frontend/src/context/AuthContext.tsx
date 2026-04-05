/**
 * AuthContext
 *
 * Global authentication context for managing user login state
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface LoginResponseData {
  access: string;
  refresh: string;
  user: UserResponse;
}

interface LoginResponse {
  status: string;
  message: string;
  data: LoginResponseData;
}

interface ErrorFieldsResponse {
  status: string;
  message: string;
  errors: Record<string, string[]>;
}

interface UserMeResponse {
  status: string;
  message: string;
  data: UserResponse;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token by fetching current user
          const response = await fetch('http://localhost:8000/api/users/me/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = (await response.json()) as UserMeResponse;
            setUser({
              id: data.data.id,
              username: data.data.username,
              email: data.data.email,
              firstName: data.data.first_name,
              lastName: data.data.last_name,
            });
          } else if (response.status === 401) {
            // Token is invalid, remove it
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        // Don't remove token on network error, user might be offline
      } finally {
        setIsAuthLoading(false);
      }
    };

    void checkAuth();
  }, []);

  const login = useCallback(async (username_or_email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username_or_email, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as Record<string, string>;
        throw new Error(data.detail || 'Login failed');
      }

      const data = (await response.json()) as LoginResponse;
      localStorage.setItem('authToken', data.data.access);
      if (data.data.refresh) {
        localStorage.setItem('refreshToken', data.data.refresh);
      }

      setUser({
        id: data.data.user.id,
        username: data.data.user.username,
        email: data.data.user.email,
        firstName: data.data.user.first_name,
        lastName: data.data.user.last_name,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          password2: data.password2,
          first_name: data.firstName,
          last_name: data.lastName,
        }),
      });

      if (!response.ok) {
        const respData = (await response.json()) as ErrorFieldsResponse | Record<string, unknown>;
        if ('errors' in respData && typeof respData.errors === 'object') {
          const errorData = respData as ErrorFieldsResponse;
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          throw new Error(errorMessages);
        }
        throw new Error('Registration failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('authToken');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
