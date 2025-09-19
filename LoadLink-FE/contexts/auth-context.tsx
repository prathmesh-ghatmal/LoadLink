// contexts/auth-context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User, UserRole } from "@/lib/data";
import { getStoredAuth, setStoredAuth } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>("guest");
  const [loading, setLoading] = useState(true); // <-- added

  useEffect(() => {
    const stored = getStoredAuth();
    setUser(stored.user);
    setIsAuthenticated(stored.isAuthenticated);
    setRole(stored.role);
    setLoading(false); // <-- done loading
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    setRole(user.role);
    setStoredAuth(user, localStorage.getItem("access_token") || undefined);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setRole("guest");
    setStoredAuth(null);
  };

  const updateUser = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    setRole(user.role);
    setStoredAuth(user, localStorage.getItem("access_token") || undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
