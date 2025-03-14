import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStrore";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the bearer token
api.interceptors.request.use(
  (config) => {
    // const { authUser } = useAuthStore.getState();
    // console.log(authToken, "dfg");

    // if (authUser) {
    //   console.log(authUser, "dfg");
    //   config.headers.Authorization = `Bearer ${authUser}`;
    // }

    const token = Cookies.get("token");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Data Payload Interfaces ---

export interface getAdminsData {
  fname: string;
}
export interface GetCurrentUserData {
  adminId: string;
  comapanyName: string;
  department: string;
  fName: string;
  lName: string;
  email: string;
  pNumber: string;
  profileImage: string;
  role: string;
  address: string;
  phoneNumber: string;
}

// --- Admin store interface

interface AdminStore {
  isLoading: boolean;
  currentUser: GetCurrentUserData | null;

  getCurrentUser: () => Promise<any>;
}

export const useUserStore = create<AdminStore>((set) => ({
  currentUser: null,
  isLoading: false,

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get("/user/currentUser");
      set({ currentUser: response.data.admin });
      console.log("getUser", response.data.admin);
    } catch (error) {
      console.log("getUser", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
