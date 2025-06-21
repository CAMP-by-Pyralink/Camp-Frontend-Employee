import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import check from "../assets/Iconv.png";
import cross from "../assets/iconx.png";
import { useTrainingStore } from "../store/useTraining";

const TrainingResults = ({ answers, isLoading }: any) => {
  // const { module: urlModule, moduleType: urlTraining } = useParams();
  // const { getAnswers, isLoading, answers, currentTraining } =
  //   useTrainingStore();

  // // Find the target module and lesson IDs
  // const targetModule = currentTraining?.modules?.find(
  //   (mod: any) => mod.moduleTitle === urlTraining
  // );

  // const quizLesson = targetModule?.lessons?.find(
  //   (lesson: any) =>
  //     lesson.lessonType.toLowerCase() === "quiz" ||
  //     (lesson.questions && lesson.questions.length > 0)
  // );

  // useEffect(() => {
  //   // Fetch answers when component mounts
  //   if (currentTraining?._id && targetModule?._id && quizLesson?._id) {
  //     const requestData = {
  //       trainingId: currentTraining._id,
  //       moduleId: targetModule._id,
  //       lessonId: quizLesson._id,
  //     };
  //     getAnswers(requestData);
  //   }
  // }, [currentTraining, targetModule, quizLesson, getAnswers]);

  // Helper function to render different question types
  const renderQuestionOptions = (answerData: any) => {
    const { question, userAnswer, isCorrect } = answerData;

    switch (question.questionType) {
      case "multiple-choice":
        return (
          <div className="flex flex-col gap-1">
            {question.options.map((option: any, index: any) => {
              const isUserSelected = userAnswer === option;

              return (
                <div
                  key={index}
                  className="py-3 px-4 flex items-center gap-2 border bg-[#FAFAFA] border-[#E3E3E3]"
                >
                  <input
                    type="radio"
                    className="w-[24px] h-[24px] appearance-none border-2 border-gray-400 rounded-full"
                    disabled
                    checked={isUserSelected}
                    style={{
                      backgroundImage: isUserSelected
                        ? isCorrect
                          ? `url(${check})`
                          : `url(${cross})`
                        : "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundColor: isUserSelected
                        ? isCorrect
                          ? "#dcfce7"
                          : "#fee2e2"
                        : "transparent",
                    }}
                  />
                  <p className="text-sm font-medium">{option}</p>
                </div>
              );
            })}
          </div>
        );

      case "checkbox":
        const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];

        return (
          <div className="flex flex-col gap-1">
            {question.options.map((option: any, index: any) => {
              const isUserSelected = userAnswerArray.includes(option);

              return (
                <div
                  key={index}
                  className="py-3 px-4 flex items-center gap-2 border bg-[#FAFAFA] border-[#E3E3E3]"
                >
                  <input
                    type="checkbox"
                    className="w-[24px] h-[24px] appearance-none border-2 border-gray-400 rounded"
                    disabled
                    checked={isUserSelected}
                    style={{
                      backgroundImage: isUserSelected
                        ? isCorrect
                          ? `url(${check})`
                          : `url(${cross})`
                        : "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundColor: isUserSelected
                        ? isCorrect
                          ? "#dcfce7"
                          : "#fee2e2"
                        : "transparent",
                    }}
                  />
                  <p className="text-sm font-medium">{option}</p>
                </div>
              );
            })}
          </div>
        );

      case "input":
        return (
          <div className="bg-[#FAFAFA] border border-[#E3E3E3] py-3 px-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Your Answer:
            </p>
            <p className="text-sm">{userAnswer || "No answer provided"}</p>
          </div>
        );

      default:
        return <p>Unknown question type: {question.questionType}</p>;
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="p-4 flex justify-center items-center">
  //       <p>Loading results...</p>
  //     </div>
  //   );
  // }

  if (!answers || answers.length === 0) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500">No results available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Questions and Answers */}
      {answers.map((answerData: any, index: any) => {
        // Skip input questions from display since they don't count toward score
        if (answerData.question.questionType === "input") {
          return (
            <div key={answerData._id} className="mb-6">
              {/* Question Header */}
              <div className="flex items-center gap-2 py-3 px-4">
                <span className="font-semibold">
                  {index + 1}. {answerData.question.question}
                </span>
                <div className="ml-auto px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  Text Answer
                </div>
              </div>

              {/* Question Options/Answers */}
              {renderQuestionOptions(answerData)}
            </div>
          );
        }

        return (
          <div key={answerData._id} className="mb-6">
            {/* Question Header */}
            <div className="flex items-center gap-2 py-3 px-4">
              <span className="font-semibold">
                {index + 1}. {answerData.question.question}
              </span>
              <div
                className={`ml-auto px-2 py-1 rounded text-xs font-medium ${
                  answerData.isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {answerData.isCorrect ? "Correct" : "Incorrect"}
              </div>
            </div>

            {/* Question Options/Answers */}
            {renderQuestionOptions(answerData)}
          </div>
        );
      })}
    </div>
  );
};

export default TrainingResults;
