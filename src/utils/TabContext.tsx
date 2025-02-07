// TabContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface TabContextType {
  activeTab: number;
  switchTab: (index: number) => void;
}

// Create the context with a default value
const TabContext = createContext<TabContextType | undefined>(undefined);

// Create a provider component
export const TabProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Default to the first tab

  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <TabContext.Provider value={{ activeTab, switchTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useTabs = (): TabContextType => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
};
