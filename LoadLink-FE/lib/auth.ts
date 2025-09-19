"use client";

import type { User, UserRole } from "./data";
import api from "./api";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
}

// ------------------
// Local storage helpers
// ------------------
export const getStoredAuth = (): AuthState => {
  if (typeof window === "undefined")
    return { user: null, isAuthenticated: false, role: "guest" };
  const stored = localStorage.getItem("loadlink-auth");
  if (stored) {
    const parsed = JSON.parse(stored);
    return { user: parsed.user, isAuthenticated: true, role: parsed.user.role };
  }
  return { user: null, isAuthenticated: false, role: "guest" };
};

export const setStoredAuth = (user: User | null, token?: string) => {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem("loadlink-auth", JSON.stringify({ user }));
    if (token) localStorage.setItem("access_token", token);
  } else {
    localStorage.removeItem("loadlink-auth");
    localStorage.removeItem("access_token");
  }
};

// ------------------
// API login/register
// ------------------
export const loginApi = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await api.post("/auth/login", { email, password });
  const { user, access_token } = res.data;
  setStoredAuth(user, access_token);
  return user;
};

export const registerApi = async (userData: {
  name: string;
  email: string;
  role: UserRole;
  phone: string;
}): Promise<User> => {
  const res = await api.post("/auth/register", userData);
  const user = res.data;
  setStoredAuth(user);
  return user;
};

export const logoutApi = () => {
  setStoredAuth(null);
};
