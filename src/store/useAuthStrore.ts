import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/// Data Payload Interfaces
export interface LoginUser {
  email: string;
  password: string;
}

export interface UpdateProfile {
  fName: string;
  lName: string;
  homeAddress: string;
  phoneNumber: string;
  profileImage: string; // base64 encoded string
}

interface AuthStore {
  isSigningIn: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (data: LoginUser) => Promise<any>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // initial state
  isAuthenticated: false,
  isSigningIn: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  login: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 201) {
        toast.success("Login successful!");
        set({ isAuthenticated: true });
      }

      console.log(response.data);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.msg || error.message || "Login failed";
      toast.error(message);
      return null;
    } finally {
      set({ isSigningIn: false });
    }
  },
  // getCurrentUser: async () => {
  //   try {
  //     const response: AxiosResponse = await api.get("/admin/currentAdmin");
  //     // set({ currentUser: response.data.admin });
  //     console.log("getAdmins", response.data.admin);
  //   } catch (error) {
  //     console.error("getAdmins", error);
  //   }
  // },
}));
