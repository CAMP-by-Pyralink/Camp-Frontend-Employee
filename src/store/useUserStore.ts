import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,

  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_APP_API_KEY,
  },
});

// Add a request interceptor to attach the bearer token
api.interceptors.request.use(
  (config) => {
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
  homeAddress: string;
  phoneNumber: string;
}

export interface updateProfile {
  fName: string;
  lName: string;
  homeAddress: string;
  phoneNumber: string;
  profileImage: string;
}

// --- Admin store interface
interface AdminStore {
  isLoading: boolean;
  currentUser: GetCurrentUserData | null;
  getCurrentUser: () => Promise<any>;
  updateProfile: (data: updateProfile) => Promise<any>;
}

export const useUserStore = create<AdminStore>((set) => ({
  currentUser: null,
  isLoading: false,

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get("/user/currentUser");
      set({ currentUser: response.data.user });
      console.log("getUser", response.data.user);
      return response.data.user;
    } catch (error: any) {
      console.log("getUser", error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      // Create a payload object with the form data
      const payload = {
        fName: data.fName,
        lName: data.lName,
        homeAddress: data.homeAddress,
        phoneNumber: data.phoneNumber,
        // Only include profilePicture if it's a base64 string (not an URL from the server)
        ...(data.profileImage && data.profileImage.startsWith("data:image")
          ? { profileImage: data.profileImage }
          : {}),
      };

      // Send the JSON payload with the base64 image
      const response: AxiosResponse = await api.patch(
        "/user/updateProfile",
        payload
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        // Update the current user in the store with new data
        set((state) => ({
          currentUser: {
            ...state.currentUser!,
            fName: data.fName,
            lName: data.lName,
            homeAddress: data.homeAddress,
            phoneNumber: data.phoneNumber,
            ...(data.profileImage && data.profileImage.startsWith("data:image")
              ? { profileImage: data.profileImage }
              : {}),
          },
        }));

        return true;
      }
      return false;
    } catch (error: any) {
      // console.log("Update profile error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
