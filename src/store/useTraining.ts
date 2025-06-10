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
    "x-api-key": import.meta.env.VITE_APP_API_KEY,
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
  answers: any[];
  currentTraining: any | null;
  getAllTrainings: (page: number) => Promise<void>;
  getSingleTraining: (trainingId: any) => Promise<void>;
  answerLessonQuestions: (answerData: {
    trainingId: string;
    moduleId: string;
    lessonId: string;
    answers: Array<{
      questionId: string;
      userAnswer: string | string[];
    }>;
  }) => Promise<boolean>;
  markAsCompleted: (data: any) => Promise<any>;
  getAnswers: (data: any) => Promise<any>;
}

export const useTrainingStore = create<TrainingStore>()(
  persist(
    (set) => ({
      isLoading: false,
      trainings: [],
      currentTraining: null,
      answers: [],

      getAllTrainings: async (page: number) => {
        set({ isLoading: true });
        try {
          const response: AxiosResponse = await api.get(
            `/training/getUserAllAssignedTrainings?page=${page}`
          );
          console.log(response.data.trainings, "Trainings");
          set({ trainings: response.data.trainings || [] });
        } catch (error: any) {
          console.log(
            error.response?.data?.message || "Error fetching trainings"
          );
          toast.error(
            error.response?.data?.message || "Failed to load trainings"
          );
        } finally {
          set({ isLoading: false });
        }
      },
      answerLessonQuestions: async (answerData) => {
        try {
          const response: AxiosResponse = await api.post(
            "/training/answerSingleLessonQuestions",
            answerData
          );

          if (response.data.success) {
            toast.success(response?.data?.message);
            return true;
          } else {
            toast.error(response.data.message || "Failed to submit answers");
            return false;
          }
        } catch (error: any) {
          console.log(
            error.response?.data?.message || "Error submitting answers"
          );
          toast.error(
            error.response?.data?.message || "Failed to submit answers"
          );
          return false;
        }
      },
      markAsCompleted: async (data) => {
        try {
          const response: AxiosResponse = await api.post(
            "/training/markLessonWithoutQuestionsCompleted",
            data
          );

          if (response.data.success) {
            toast.success(response?.data?.message);
            return true;
          } else {
            toast.error(response.data.message);
            return false;
          }
        } catch (error: any) {
          console.log(error.response?.data?.message);
          toast.error(error.response?.data?.message);
          return false;
        }
      },
      getAnswers: async (data: any) => {
        set({ isLoading: true });
        try {
          const response = await api.post(
            "/training/getUserAnsweredLessonQuestions",
            data
          );
          if (response.data.success) {
            set({ answers: response.data.data });
            console.log(response.data.data);
            toast.success(response?.data?.message);
            return true;
          } else {
            toast.error(response.data.message || "Failed to submit answers");
            return false;
          }
        } catch (error: any) {
          console.log(
            error.response?.data?.message || "Error submitting answers"
          );
          toast(error.response.message);
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
          console.log(error.response?.data?.message);
          // toast.error(error.response?.data?.message || "Failed to load training");
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
