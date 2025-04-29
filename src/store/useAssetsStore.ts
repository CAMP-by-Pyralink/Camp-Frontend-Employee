import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export interface Asset {
  assetId: string;
  assetName: string;
  barCode: string;
  assetType: string;
  assetStatus: string;
  assignedTo: string;
  assignedDate: string;
  location: string;
  department: string;
  currentLocation: string;
  assetImage: string;
}

interface AssetStore {
  isLoading: boolean;
  allAssets: any[];
  singleAsset: Asset | null;
  getAllAssets: () => Promise<any>;
  getAssetById: (id: string) => Promise<any>;
}

export const useAssetsStore = create<AssetStore>((set) => ({
  isLoading: false,
  allAssets: [],
  singleAsset: null,
  getAllAssets: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("asset/getUserAllAssignedAssets");
      console.log("Assets:", response.data);
      set({ allAssets: response.data.assets });
      //   toast.success("Assets fetched successfully");
    } catch (error) {
      console.log("Error fetching assets:", error);
      //   toast.error("Failed to fetch assets");
    } finally {
      set({ isLoading: false });
    }
  },
  getAssetById: async (id: string) => {
    set({ isLoading: true });

    try {
      // State to track the active tab
      const response = await api.get(`/asset/getSingleUserAssignedAsset/${id}`);
      console.log("Asset:", response.data);
      set({ singleAsset: response.data.asset });
    } catch (error) {
      console.error("Error fetching asset:", error);
      // toast.error("Failed to fetch asset");
    } finally {
      set({ isLoading: false });
    }
  },
}));
