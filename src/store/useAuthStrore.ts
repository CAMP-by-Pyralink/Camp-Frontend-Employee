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
  profileImage: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningIn: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (data: LoginUser) => Promise<any>;
}

export interface AuthUser {
  token: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // initial state
  authUser: null,
  isAuthenticated: false,
  isSigningIn: false,
  //setters
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAuthUser: (user: AuthUser | null) => set({ authUser: user }),

  login: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 201) {
        toast.success(response.data.msg);
        // set({ isAuthenticated: true });
      }
      const user: AuthUser = response.data.token;
      set({ isAuthenticated: true });
      set({ authUser: user });
      sessionStorage.setItem("isAuthenticated", "true");

      toast.success(response.data.msg);

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
