import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTrainingStore } from "../store/useTraining";

const TrainingQuestions = () => {
  const navigate = useNavigate();
  // Rename variables to match actual data structure
  const { module: urlModule, moduleType: urlTraining } = useParams();

  const { currentTraining } = useTrainingStore();
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 3;

  // Log the provided params and current training data for debugging
  useEffect(() => {
    console.log("URL Module param:", urlModule);
    console.log("URL Training param:", urlTraining);
    console.log("Current Training Data:", currentTraining);
  }, [urlModule, urlTraining, currentTraining]);

  // Check if the current training matches the URL training parameter
  const isCorrectTraining = currentTraining?.title === urlModule;

  useEffect(() => {
    console.log("Is Correct Training:", isCorrectTraining);
  }, [isCorrectTraining]);

  // Find the module based on the URL moduleType (which is actually the module title)
  const targetModule = useMemo(() => {
    if (!currentTraining || !currentTraining.modules || !isCorrectTraining) {
      return null;
    }

    return currentTraining.modules.find(
      (mod: { moduleTitle: string | undefined }) =>
        mod.moduleTitle === urlTraining
    );
  }, [currentTraining, urlTraining, isCorrectTraining]);

  useEffect(() => {
    console.log("Target Module:", targetModule);
  }, [targetModule]);

  // Find the lesson that has questions
  const quizLesson = useMemo(() => {
    if (!targetModule || !targetModule.lessons) {
      return null;
    }

    return targetModule.lessons.find(
      (lesson: { lessonType: string; questions: string | any[] }) =>
        lesson.lessonType.toLowerCase() === "quiz" ||
        (lesson.questions && lesson.questions.length > 0)
    );
  }, [targetModule]);

  useEffect(() => {
    console.log("Quiz Lesson:", quizLesson);
  }, [quizLesson]);

  // Safely access questions
  const questions = quizLesson?.questions || [];

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleSubmit = () => {
    navigate(`/training/result/${urlModule}/${urlTraining}`);
  };

  // Loading state
  if (!currentTraining) {
    return <div className="p-4">Loading training data...</div>;
  }

  // Check if training matches
  if (!isCorrectTraining) {
    return (
      <div className="p-4">
        <p className="text-center text-red-500">
          Training "{urlModule}" not found.
        </p>
      </div>
    );
  }

  // No matching module found
  if (!targetModule) {
    return (
      <div className="p-4">
        <p className="text-center text-red-500">
          Module "{urlTraining}" not found in training "{urlModule}".
        </p>
      </div>
    );
  }

  // No quiz lesson or questions found
  if (!quizLesson || questions.length === 0) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500">
          No questions available for this module.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {currentTraining.title}: {targetModule.moduleTitle} - Quiz
      </h2>

      {currentQuestions.map(
        (
          q: {
            _id: any;
            question:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            options: any[];
          },
          idx: number
        ) => (
          <div key={q._id || idx} className="mb-6">
            <p className="py-3 px-4 font-semibold">
              {startIndex + idx + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-1">
              {q.options.map(
                (
                  option:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="bg-[#FAFAFA] border border-[#E3E3E3] py-3 px-4"
                  >
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-[24px] h-[24px]" />
                      <p className="text-sm font-medium">{option}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )
      )}

      <div className="flex justify-between mt-4">
        <div className="w-full flex items-center gap-4 justify-end">
          {currentPage > 0 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 text-sm font-medium rounded-[8px] w-[106px] border border-[#D0D5DD] bg-white text-[#333333]"
            >
              Previous
            </button>
          )}

          {startIndex + questionsPerPage < questions.length ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-[8px] text-sm font-medium w-[106px] bg-[#282EFF] text-white"
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 text-sm font-medium rounded-[8px] w-[106px] bg-[#282EFF] text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingQuestions;
