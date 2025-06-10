import React, { createContext, useContext, useState } from "react";

// Define Lesson interface
export interface Lesson {
  startTraining: boolean;
  description: any;
  _id: string;
  lessonType: string;
  lessonTitle: string;
  content: string;
  moduleId: string;
  trainingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  questions?: any[];
  lessonProgress: {
    score: number;
    completionStatus: string;
    attempts: number;
  };
}

interface TabContextType {
  activeTab: number;
  switchTab: (tab: number) => void;
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const switchTab = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <TabContext.Provider
      value={{ activeTab, switchTab, currentLesson, setCurrentLesson }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
};
