import React from "react";
import { useTabs } from "../utils/TabContext";

interface TrainingProps {
  currentTraining: {
    description: string;
  };
}

const TrainingDescription: React.FC<TrainingProps> = ({ currentTraining }) => {
  const { currentLesson } = useTabs();

  return (
    <div className="w-full">
      <div className="text-sm text-[#1B1B1B99]">
        <h1 className="text-[24px] text-[#333333] font-semibold">
          {currentLesson ? currentLesson.lessonTitle : "Training Description"}
        </h1>
        <div className="mt-7">
          {currentLesson ? (
            <div>
              <p className="mb-4">
                <strong>Type:</strong>{" "}
                {currentLesson.lessonType.charAt(0).toUpperCase() +
                  currentLesson.lessonType.slice(1)}
              </p>

              {currentLesson.lessonType.toLowerCase() === "text" ? (
                <div className="lesson-content">{currentLesson.content}</div>
              ) : currentLesson.lessonType.toLowerCase() === "link" ||
                currentLesson.lessonType.toLowerCase() === "video" ? (
                <div>
                  <p className="mb-4">This lesson contains video content.</p>
                  <a
                    href={currentLesson.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Video Content
                  </a>
                </div>
              ) : (
                <p>{currentLesson.content}</p>
              )}

              {currentLesson.questions &&
                currentLesson.questions.length > 0 && (
                  <p className="mt-4">
                    This lesson includes an assessment with{" "}
                    {currentLesson.questions.length} questions.
                  </p>
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
                    <strong>Score:</strong> {currentLesson.lessonProgress.score}
                    %
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
          ) : (
            <p>{currentTraining.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingDescription;
