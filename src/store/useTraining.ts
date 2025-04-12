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

/// Data Payload Interfaces

// --- Training store interface
interface TrainingStore {
  isLoading: boolean;
  trainings: any[];
  currentTraining: any | null;

  getAllTrainings: (data: number) => Promise<any>;
  getSingleTraining: (data: any) => Promise<any>;
}

export const useTrainingStore = create<TrainingStore>((set) => ({
  isLoading: false,
  trainings: [],
  currentTraining: null,

  getAllTrainings: async (page: number) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get(
        `/training/getUserAllAssignedTrainings?page=${page}`
      );
      console.log(response.data.trainings, "Trainning");
      set({ trainings: response.data.trainings || [] });
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  },
  getSingleTraining: async (trainingId: any) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get(
        `/training/getUserSingleAssignedTraining/${trainingId}`
      );
      console.log(response.data.training, "Training");
      // Set the current training in the store state
      set({
        currentTraining: response.data.training,
        isLoading: false,
      });
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  },
}));
