import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TrainingDescription from "../../components/TrainingDescription";
import TrainingModules from "../../components/TrainingModules";
import { useTabs } from "../../utils/TabContext";
import VideoPlayer from "../../components/VideoPlayers";
import NotifyModal from "../../components/NotifyModal";
import { useTrainingStore } from "../../store/useTraining";

const TrainingModule = () => {
  const { activeTab, currentLesson } = useTabs();
  const { currentTraining, isLoading, getAllTrainings } = useTrainingStore();

  if (isLoading || !currentTraining) return <div>Loading...</div>;

  return (
    <div className="font-poppins relative">
      <div className="absolute">
        <div className="flex items-center gap-4 mt-5 font-poppins">
          <Link to={"/"} className="text-sm font-medium text-[#282EFF]">
            Dashboard
          </Link>
          <p>/</p>
          <Link to={"/training"} className="text-sm font-medium text-[#282EFF]">
            Training
          </Link>
          <p>/</p>
          <p className="text-sm font-medium text-[#898384]">
            {currentTraining?.title}
          </p>
        </div>

        {/* modal */}
        <NotifyModal />

        {activeTab === 0 && (
          <div className="w-full flex items-center justify-center gap-5 bg-[#EBECFF] mt-6 rounded-[24px] px-[50px] py-[47px]">
            <div className="text-[#333333]">
              <h1 className="font-semibold text-[56px] leading-[56px] max-w-[488px]">
                {currentTraining?.title}
              </h1>
              <p className="font-medium mt-3">
                {currentTraining?.modules.length} modules
              </p>
              {/* <p className="text-sm">8 hours</p> */}
            </div>
            <div>
              <div className="w-[428px] h-[244px] overflow-hidden rounded-[30px]">
                <img
                  className="w-full h-full object-cover"
                  src={currentTraining.bannerImage}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}

        {/* trainings */}
        <div className="relative w-full">
          <div className="w-full flex gap-10 mt-10">
            <div className="w-full">
              {/* Main content area */}
              {activeTab === 0 ? (
                <TrainingDescription currentTraining={currentTraining} />
              ) : currentLesson &&
                (currentLesson.lessonType.toLowerCase() === "video" ||
                  currentLesson.lessonType.toLowerCase() === "link") ? (
                <div>
                  <h1 className="text-[24px] text-[#333333] font-semibold mb-4">
                    {currentLesson.lessonTitle}
                  </h1>
                  <VideoPlayer />
                  <div className="mt-6">
                    <p className="text-sm text-[#1B1B1B99]">
                      <strong>Type:</strong>{" "}
                      {currentLesson.lessonType.charAt(0).toUpperCase() +
                        currentLesson.lessonType.slice(1)}
                    </p>

                    <div className="mt-4">
                      <p className="text-sm text-[#1B1B1B99]">
                        <strong>Completion Status:</strong>{" "}
                        {currentLesson.lessonProgress.completionStatus ===
                        "completed"
                          ? "Completed"
                          : currentLesson.lessonProgress.completionStatus ===
                            "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <TrainingDescription currentTraining={currentTraining} />
              )}
            </div>
            <div className="w-[70%]">
              <TrainingModules currentTraining={currentTraining} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
