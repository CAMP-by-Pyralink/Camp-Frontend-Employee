import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import check from "../assets/check-circle.png";
import close from "../assets/svgs/close.svg";
import { useTrainingStore } from "../store/useTraining";

const DisplayScores = ({ answers }: any) => {
  const navigate = useNavigate();
  // const { answers, getAnswers } = useTrainingStore();
  console.log(answers[0]?.training);
  const trainingId = answers[0]?.training;

  // useEffect(() => {
  //   getAnswers();
  // });

  // Calculate score excluding input questions
  const scorableQuestions =
    answers?.filter(
      (answer: any) => answer.question.questionType !== "input"
    ) || [];

  const correctAnswers = scorableQuestions.filter(
    (answer: any) => answer.isCorrect
  ).length;
  const totalQuestions = scorableQuestions.length;
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  // Determine pass/fail status
  const isPassed = scorePercentage >= 50;
  const isExcellent = scorePercentage >= 90;

  const handleRetakeTraining = () => {
    // Navigate back to training or implement retake logic
    navigate(-2); // Go back 2 steps to return to the training questions
  };

  const handleKeepLearning = () => {
    // Navigate to next training or dashboard
    navigate(`/training/${trainingId}`);
  };

  if (!answers || answers.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="bg-[#DEEFFC] my-7 py-4 px-[24px] rounded-[10px]">
        <div
          className={`w-full bg-white border-l-4 ${
            isPassed ? "border-l-[#0B7B69]" : "border-l-[#DC2626]"
          } border border-[#E4E7EC] flex gap-4 p-[20px]`}
        >
          <div>
            {/* Icon */}
            <div
              className={`flex items-center justify-center w-[32px] aspect-square border ${
                isPassed
                  ? "border-[#C6DDF7] bg-[#E3EFFC]"
                  : "border-[#FEE2E2] bg-[#FEF2F2]"
              } rounded-lg`}
            >
              <div>
                <img src={isPassed ? check : close} alt="" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full border-r border-[#F0F2F5] pr-4">
            <p className="text-[#101928] font-medium">
              {isPassed
                ? isExcellent
                  ? "Congratulation! You passed!"
                  : "Good job! You passed!"
                : "Oops! Not quite there yet—keep going!"}
            </p>
            <p className="text-sm text-[#475367] max-w-[865px]">
              To pass, {isExcellent ? "90% or higher" : "50% or higher"}
            </p>
            <div className="w-full flex items-end justify-end">
              {isPassed ? (
                <button
                  onClick={handleKeepLearning}
                  className="px-4 py-2 rounded-[8px] text-sm font-medium bg-[#282EFF] text-white hover:bg-[#2024CC] transition-colors"
                >
                  Keep Learning
                </button>
              ) : (
                <button
                  onClick={handleRetakeTraining}
                  className="px-4 py-2 rounded-[8px] text-sm font-medium bg-[#282EFF] text-white hover:bg-[#2024CC] transition-colors"
                >
                  Retake Training
                </button>
              )}
            </div>
          </div>

          {/* Score Display */}
          <div className="w-[40%] flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs">Your score:</p>
              <p
                className={`text-[24px] font-medium ${
                  isPassed ? "text-[#0B7B69]" : "text-[#DC2626]"
                }`}
              >
                {scorePercentage}%
              </p>
              <p
                className={`font-medium ${
                  isPassed ? "text-[#333333]" : "text-[#DC2626]"
                }`}
              >
                {isPassed ? "Passed" : "Failed"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayScores;
