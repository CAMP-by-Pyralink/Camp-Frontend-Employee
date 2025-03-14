import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

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

export interface ForgotPassword {
  email: string;
}
export interface VerifyEmailResetPassword {
  token: string;
  email: string;
}
export interface ResendTokenAdmin {
  email: string;
}

export interface ChangePassword {
  email: string;
  newPassword: string;
  confirmPassword: string;
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
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (data: LoginUser) => Promise<any>;
  forgotPassword: (data: ForgotPassword) => Promise<any>;
  verifyEmailResetPassword: (data: VerifyEmailResetPassword) => Promise<any>;
  resendTokenForgotPassword: (data: ResendTokenAdmin) => Promise<any>;
  changepassword: (data: ChangePassword) => Promise<any>;
  logout: () => Promise<void>;
}

export interface AuthUser {
  token: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // initial state
  authUser: null,
  isAuthenticated: false,
  isSigningIn: false,
  isLoading: false,
  //setters
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAuthUser: (user: AuthUser | null) => set({ authUser: user }),

  login: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1, secure: true });
        set({ authUser: { token }, isAuthenticated: true });

        toast.success(response.data.msg);
        return true;
      }
      return false;
    } catch (error: any) {
      const message =
        error?.response?.data?.msg || error.message || "Login failed";
      toast.error(message);
      return null;
    } finally {
      set({ isSigningIn: false });
    }
  },
  forgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/user/forgotPassword", data);
      if (response.status === 200) {
        toast.success(response.data.msg);
        sessionStorage.setItem("email", response.data.email);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      // const message = error?.response?.data?.msg || "Login failed";
      toast.error(error.response.data.msg);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  verifyEmailResetPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/user/verifyEmailResetPassword", data);
      if (response.status === 200) {
        toast.success(response.data.msg);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      toast.error(error.response.data.msg);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  resendTokenForgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/user/resendToken", data);
      if (response.status === 200) {
        toast.success(response.data.msg);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      toast.error(error.response.data.msg);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  changepassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.patch("/user/changePassword", data);
      if (response.status === 200) {
        toast.success(response.data.msg);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      toast.error(error.response.data.msg);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ authUser: null, isAuthenticated: false });
    Cookies.remove("token");
    toast.success("Logged out successfully!");
  },
}));
