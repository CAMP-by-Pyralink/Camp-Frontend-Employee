import React, { useEffect, useState } from "react";
import TrainingTab1 from "./TrainingTab1";
import BadgeTab from "./BadgeTab";
import { useTrainingStore } from "../store/useTraining";

const TrainingsTab = () => {
  const [activeTab, setActiveTab] = useState("1");

  const { getAllTrainings, trainings, isLoading, getSingleTraining } =
    useTrainingStore();

  useEffect(() => {
    getAllTrainings(1);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-full">
      <div className="w-full bg-[#EBECFF] px-[30px] pb-[30px]">
        {/* tab button */}
        <div className="flex items-center gap-4">
          <button
            className={` border-b flex items-center gap-4 text-sm font-medium p-4 ${
              activeTab === "1"
                ? "border-[#5358FF] text-[#5358FF]"
                : "text-[#5A5555] border-[#E4E7EC]"
            }`}
            onClick={() => handleTabClick("1")}
          >
            Training{" "}
            <span
              className={` rounded-[12px] px-[8px] text-xs font-medium ${
                activeTab === "1"
                  ? "bg-[#5358FF] text-white"
                  : "text-[#5A5555] bg-[#E4E7EC]"
              }`}
            >
              {trainings.length}
            </span>
          </button>
          <button
            className={` border-b flex items-center gap-4 text-sm font-medium p-4 ${
              activeTab === "2"
                ? "border-[#5358FF] text-[#5358FF]"
                : "text-[#5A5555] border-[#E4E7EC]"
            }`}
            onClick={() => handleTabClick("2")}
          >
            Badges
            <span
              className={` rounded-[12px] px-[8px] text-xs font-medium ${
                activeTab === "2"
                  ? "bg-[#5358FF] text-white"
                  : "text-[#5A5555] bg-[#E4E7EC]"
              }`}
            >
              0
            </span>
          </button>
        </div>

        <div>
          {activeTab === "1" && (
            <div>
              <TrainingTab1 handleTab={handleTabClick} />
            </div>
          )}
          {activeTab === "2" && (
            <div>
              <BadgeTab />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingsTab;
