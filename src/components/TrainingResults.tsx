import React from "react";
import check from "../assets/Iconv.png";
import cross from "../assets/iconx.png";

const TrainingResults = () => {
  const questions = [
    {
      id: 1,
      question: "What is Risk Management?",
      options: [
        "The process of identifying, assessing, and mitigating potential risks to reduce their impact on an organization.", // Correct
        "The process of making financial investments for maximum profit.",
        "A method to eliminate all risks within an organization.",
        "The practice of predicting stock market trends.",
      ],
      correctAnswerIndex: 0,
      selectedAnswerIndex: 1, // Simulating incorrect selection
    },
    {
      id: 2,
      question: "What is a Risk Assessment?",
      options: [
        "An evaluation to identify hazards and analyze risks associated with them.", // Correct
        "A financial tool for profit maximization.",
        "A guide for stock market analysis.",
        "A checklist for all organizational risks.",
      ],
      correctAnswerIndex: 0,
      selectedAnswerIndex: 0, // Simulating correct selection
    },
    {
      id: 3,
      question: "Why is Risk Management important?",
      options: [
        "To ensure organizational safety and efficiency.", // Correct
        "To guarantee all risks are eliminated.",
        "To maximize stock market investments.",
        "To predict market trends accurately.",
      ],
      correctAnswerIndex: 0,
      selectedAnswerIndex: 2, // Simulating incorrect selection
    },
    {
      id: 4,
      question: "What are the types of risks?",
      options: [
        "Operational, financial, and strategic risks.", // Correct
        "Only financial risks.",
        "Market trends and patterns.",
        "Stock performance risks.",
      ],
      correctAnswerIndex: 0,
      selectedAnswerIndex: 0, // Simulating correct selection
    },
  ];

  return (
    <div className="p-4">
      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          {/* Question */}
          <p className="py-3 px-4 font-semibold">{`${q.id}. ${q.question}`}</p>
          {/* Options */}
          <div className="flex flex-col gap-1">
            {q.options.map((option, index) => {
              const isCorrect = index === q.correctAnswerIndex;
              const isSelected = index === q.selectedAnswerIndex;

              return (
                <div
                  key={index}
                  className="py-3 px-4 flex items-center gap-2 border"
                >
                  <input
                    type="checkbox"
                    className={`w-[24px] h-[24px] appearance-none border-2 border-gray-400 rounded ${
                      isSelected && !isCorrect
                        ? "checked:bg-[#e3e3e3] checked:border-[#e3e3e3]"
                        : "checked:bg-blue-600 checked:border-blue-600"
                    } `}
                    disabled
                    checked={isCorrect || (isSelected && !isCorrect)}
                    style={{
                      backgroundImage:
                        isSelected && !isCorrect
                          ? `url(${cross})`
                          : `url(${check})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                  <p className="text-sm font-medium">{option}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainingResults;
