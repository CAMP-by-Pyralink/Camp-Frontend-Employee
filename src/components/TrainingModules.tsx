import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dropdown from "../assets/dropdown.png";
import dropup from "../assets/dropup.png";
import video from "../assets/video.png";
import book from "../assets/book.png";
import assess from "../assets/assess.png";
import { useTabs, Lesson } from "../utils/TabContext";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

interface Module {
  _id: string;
  moduleTitle: string;
  trainingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lessons: Lesson[];
  moduleCompletion: number;
}

interface Training {
  _id: string;
  title: string;
  bannerImage: string;
  description: string;
  modules: Module[];
  totalModules: number;
  totalLessons: number;
  progressPercentage: number;
  startTraining?: boolean;
}

interface TrainingModulesProps {
  currentTraining: Training;
}

const TrainingModules = ({ currentTraining }: TrainingModulesProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const { switchTab, setCurrentLesson } = useTabs();

  const navigate = useNavigate();

  const startAssessment = (module: string, moduleType: string) => {
    navigate(`/training/start-assesment/${module}/${moduleType}`);
  };

  const toggleDropdown = (moduleId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const getLessonIcon = (lessonType: string) => {
    switch (lessonType.toLowerCase()) {
      case "link":
      case "video":
        return video;
      case "text":
      case "document":
        return book;
      case "quiz":
      case "assessment":
        return assess;
      default:
        return video;
    }
  };

  const handleLessonClick = (
    lesson: any,
    index: number,
    lessonIndex: number,
    module: Module
  ) => {
    // Check if the lesson is locked (startTraining is false)
    if (lesson.startTraining === false) {
      return; // Don't execute anything if lesson is locked
    }

    switchTab(index * module.lessons.length + lessonIndex + 1);
    setCurrentLesson(lesson);
  };

  return (
    <div className="w-full px-[28px]">
      <div className="w-full">
        <div>
          <h1 className="text-[24px] text-[#333333] font-semibold">Modules</h1>
        </div>

        {currentTraining.modules.map((module, index) => (
          <div
            key={module._id}
            className="border border-[#B5B3B3] py-[10px] px-[20px] mt-4"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <p>{module.moduleTitle}</p>
              </div>

              <div className="flex items-center gap-5">
                <div style={{ width: 45, height: 45 }}>
                  <CircularProgressbar
                    value={module.moduleCompletion || 0}
                    styles={buildStyles({
                      textSize: "30px",
                    })}
                    text={`${module.moduleCompletion || 0}%`}
                  />
                </div>

                <div>
                  <button onClick={() => toggleDropdown(module._id)}>
                    <img
                      src={openDropdowns[module._id] ? dropup : dropdown}
                      alt="Toggle dropdown"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Dropdown content */}
            {openDropdowns[module._id] && (
              <div className="flex flex-col gap-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lesson._id}
                    className={`flex items-center gap-2 ${
                      lesson.startTraining === false
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      handleLessonClick(lesson, index, lessonIndex, module)
                    }
                    disabled={lesson.startTraining === false}
                  >
                    <div className="flex items-center gap-2">
                      {/* Show lock icon if lesson is locked */}
                      <img src={getLessonIcon(lesson.lessonType)} alt="" />
                    </div>
                    <p className="text-xs">{lesson.lessonTitle}</p>
                    {lesson.startTraining === false && <Lock size={10} />}
                  </button>
                ))}

                {/* Add Assessment button if needed */}
                {module.lessons.some(
                  (lesson) =>
                    lesson.lessonType.toLowerCase() === "quiz" ||
                    (lesson.questions?.length ?? 0) > 0
                ) && (
                  <button
                    className="flex items-center gap-2"
                    onClick={() => {
                      startAssessment(
                        currentTraining.title,
                        module.moduleTitle
                      );
                    }}
                  >
                    <div>
                      <img src={assess} alt="" />
                    </div>
                    <p className="text-xs">Assessment</p>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingModules;
