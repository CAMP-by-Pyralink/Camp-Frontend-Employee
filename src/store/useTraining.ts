import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { EncryptStorage } from "encrypt-storage";

// const { EncryptStorage } = await import("encrypt-storage");

const encryptStorage = new EncryptStorage("hotmony123456789", {
  storageType: "sessionStorage",
});

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

api.interceptors.request.use(
  (request) => {
    console.log("Request:", request);
    return request;
  },
  (error) => {
    console.log("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Response Error:", error);
    return Promise.reject(error);
  }
);

// --- Store Interface
interface TrainingStore {
  isLoading: boolean;
  trainings: any[];
  currentTraining: any | null;
  getAllTrainings: (page: number) => Promise<void>;
  getSingleTraining: (trainingId: any) => Promise<void>;
}

export const useTrainingStore = create<TrainingStore>()(
  persist(
    (set) => ({
      isLoading: false,
      trainings: [],
      currentTraining: null,

      getAllTrainings: async (page: number) => {
        set({ isLoading: true });
        try {
          const response: AxiosResponse = await api.get(
            `/training/getUserAllAssignedTrainings?page=${page}`
          );
          console.log(response.data.trainings, "Trainings");
          set({ trainings: response.data.trainings || [] });
        } catch (error: any) {
          console.log(error.response?.data?.msg || "Error fetching trainings");
          toast.error(error.response?.data?.msg || "Failed to load trainings");
        } finally {
          set({ isLoading: false });
        }
      },

      getSingleTraining: async (trainingId: any) => {
        set({ isLoading: true });
        try {
          const response: AxiosResponse = await api.get(
            `/training/getUserSingleAssignedTraining/${trainingId}`
          );
          console.log(response.data.training, "Training");
          set({
            currentTraining: response.data.training || null,
          });
        } catch (error: any) {
          console.log(error.response?.data?.msg);
          // toast.error(error.response?.data?.msg || "Failed to load training");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "training-storage",
      partialize: (state) => ({
        currentTraining: state.currentTraining,
        trainings: state.trainings,
      }),
      storage: {
        getItem: (name) => encryptStorage.getItem(name),
        setItem: (name, value) => encryptStorage.setItem(name, value),
        removeItem: (name) => encryptStorage.removeItem(name),
      },
    }
  )
);

// import { useTrainingStore } from "../store/useTraining";

// useTrainingStore.persist.clearStorage(); // clear encrypted state
