import React from "react";
import { useTabs } from "../utils/TabContext";

const TrainingDescription1: React.FC = () => {
  const { currentLesson } = useTabs();

  if (!currentLesson) {
    return (
      <div className="w-full">
        <div className="text-sm text-[#1B1B1B99]">
          <h1 className="text-[24px] text-[#333333] font-semibold">
            No Lesson Selected
          </h1>
          <p className="mt-7">
            Please select a lesson from the module list to view its content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-sm text-[#1B1B1B99]">
        <h1 className="text-[24px] text-[#333333] font-semibold">
          {currentLesson.lessonTitle}
        </h1>

        <div className="mt-7">
          <p className="mb-4">
            <strong>Type:</strong>{" "}
            {currentLesson.lessonType.charAt(0).toUpperCase() +
              currentLesson.lessonType.slice(1)}
          </p>

          {currentLesson.lessonType.toLowerCase() === "text" && (
            <div className="lesson-content whitespace-pre-line">
              {currentLesson.content}
            </div>
          )}

          <div className="mt-6">
            <p>
              <strong>Completion Status:</strong>{" "}
              {currentLesson.lessonProgress.completionStatus === "completed"
                ? "Completed"
                : currentLesson.lessonProgress.completionStatus ===
                  "in-progress"
                ? "In Progress"
                : "Not Started"}
            </p>
            {currentLesson.lessonProgress.score > 0 && (
              <p className="mt-2">
                <strong>Score:</strong> {currentLesson.lessonProgress.score}%
              </p>
            )}
            {currentLesson.lessonProgress.attempts > 0 && (
              <p className="mt-2">
                <strong>Attempts:</strong>{" "}
                {currentLesson.lessonProgress.attempts}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDescription1;
