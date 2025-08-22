import { create } from "zustand";
import { User } from "@/lib/generated/prisma";
import axios from "axios";

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  rehydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  accessToken: null,
  loading: true,

  login: (user, token) => {
    localStorage.setItem("accessToken", token);
    set({ isLoggedIn: true, user, accessToken: token, loading: false });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false, user: null, accessToken: null, loading: false });
  },

  rehydrate: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const response = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        isLoggedIn: true,
        user: response.data.user,
        accessToken: token,
        loading: false,
      });
    } catch (err) {
      console.error("Rehydrate failed:", err);
      localStorage.removeItem("accessToken");
      set({ loading: false });
    }
  },
}));
