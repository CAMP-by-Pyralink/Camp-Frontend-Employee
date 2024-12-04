import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TrainingQuestions = () => {
  const navigate = useNavigate();

  const { module, moduleType } = useParams<{
    module: string;
    moduleType: string;
  }>();

  const results = () => {
    navigate(`/training/result/${module}/${moduleType}`);
  };
  const questions = [
    {
      id: 1,
      question: "What is Risk Management?",
      options: [
        "The process of identifying, assessing, and mitigating potential risks to reduce their impact on an organization.",
        "The process of making financial investments for maximum profit.",
        "A method to eliminate all risks within an organization.",
        "The practice of predicting stock market trends.",
      ],
    },
    {
      id: 2,
      question: "What is a Risk Assessment?",
      options: [
        "An evaluation to identify hazards and analyze risks associated with them.",
        "A financial tool for profit maximization.",
        "A guide for stock market analysis.",
        "A checklist for all organizational risks.",
      ],
    },
    {
      id: 3,
      question: "Why is Risk Management important?",
      options: [
        "To ensure organizational safety and efficiency.",
        "To guarantee all risks are eliminated.",
        "To maximize stock market investments.",
        "To predict market trends accurately.",
      ],
    },
    {
      id: 4,
      question: "What are the types of risks?",
      options: [
        "Operational, financial, and strategic risks.",
        "Only financial risks.",
        "Market trends and patterns.",
        "Stock performance risks.",
      ],
    },
    {
      id: 5,
      question: "How to mitigate risks?",
      options: [
        "By identifying, evaluating, and implementing risk controls.",
        "By eliminating all risks.",
        "By predicting future risks.",
        "By analyzing stock performance.",
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const questionsPerPage = 3;
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

  return (
    <div className="p-4">
      {currentQuestions.map((q) => (
        <div key={q.id} className="mb-6">
          {/* Question */}
          <p className="py-3 px-4 font-semibold">{`${q.id}. ${q.question}`}</p>
          {/* Options */}
          <div className="flex flex-col gap-1">
            {q.options.map((option, index) => (
              <div
                key={index}
                className="bg-[#FAFAFA] border border-[#E3E3E3] py-3 px-4"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-[24px] h-[24px]" />
                  <p className="text-sm font-medium">{option}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {currentPage > 0 && (
          <div className="w-full flex items-center gap-4 justify-end">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 text-sm font-medium rounded-[8px] w-[106px] border border-[#D0D5DD] bg-white text-[#333333]"
            >
              Previous
            </button>
            <button
              className="px-4 py-2 text-sm font-medium rounded-[8px] w-[106px] bg-[#282EFF] text-white"
              onClick={results}
            >
              Submit
            </button>
          </div>
        )}
        {startIndex + questionsPerPage < questions.length && (
          <div className="w-full flex items-center justify-end">
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-[8px] text-sm font-medium w-[106px] bg-[#282EFF] text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingQuestions;
