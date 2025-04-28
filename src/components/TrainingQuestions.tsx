import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTrainingStore } from "../store/useTraining";

// Define types for better TypeScript support
interface Question {
  _id: string;
  question: string;
  questionType: "multiple-choice" | "checkbox" | "input" | string;
  options?: string[];
}

interface Lesson {
  _id: string;
  lessonType: string;
  questions: Question[];
}

interface Module {
  _id: string;
  moduleTitle: string;
  lessons: Lesson[];
}

interface Training {
  _id: string;
  title: string;
  modules: Module[];
}

interface AnswerFormat {
  questionId: string;
  userAnswer: any;
}

interface SubmissionData {
  trainingId: string;
  moduleId: string;
  lessonId: string;
  answers: AnswerFormat[];
}

const TrainingQuestions: React.FC = () => {
  const navigate = useNavigate();
  const { module: urlModule, moduleType: urlTraining } = useParams<{
    module: string;
    moduleType: string;
  }>();
  const { currentTraining, answerLessonQuestions } = useTrainingStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionsPerPage = 3;

  // Check if the current training matches the URL training parameter
  const isCorrectTraining = currentTraining?.title === urlModule;

  // Find the module based on the URL moduleType
  const targetModule = useMemo(() => {
    if (!currentTraining?.modules || !isCorrectTraining) return null;
    return currentTraining.modules.find(
      (mod: { moduleTitle: string | undefined }) =>
        mod.moduleTitle === urlTraining
    );
  }, [currentTraining, urlTraining, isCorrectTraining]);

  // Find the lesson that has questions
  const quizLesson = useMemo(() => {
    if (!targetModule?.lessons) return null;
    return targetModule.lessons.find(
      (lesson: { lessonType: string; questions: string | any[] }) =>
        lesson.lessonType.toLowerCase() === "quiz" ||
        (lesson.questions && lesson.questions.length > 0)
    );
  }, [targetModule]);

  // Safely access questions
  const questions = quizLesson?.questions || [];

  // Initialize answers state when questions load
  useEffect(() => {
    if (questions.length > 0) {
      const initialAnswers: Record<string, any> = {};
      questions.forEach((q: Question) => {
        if (q.questionType === "multiple-choice") {
          initialAnswers[q._id] = null;
        } else if (q.questionType === "checkbox") {
          initialAnswers[q._id] = [];
        } else if (q.questionType === "input") {
          initialAnswers[q._id] = "";
        }
      });
      setAnswers(initialAnswers);
    }
  }, [questions]);

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const handleMultipleChoiceChange = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleCheckboxChange = (
    questionId: string,
    option: string,
    isChecked: boolean
  ) => {
    setAnswers((prev) => {
      const currentSelections = prev[questionId] || [];
      const newSelections = isChecked
        ? [...currentSelections, option]
        : currentSelections.filter((item: string) => item !== option);

      return {
        ...prev,
        [questionId]: newSelections,
      };
    });
  };

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => setCurrentPage((prev) => prev + 1);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!currentTraining?._id || !targetModule?._id || !quizLesson?._id) {
      console.error("Missing required IDs for submission");
      return;
    }

    // Format answers for the API
    const formattedAnswers: AnswerFormat[] = Object.entries(answers).map(
      ([questionId, userAnswer]) => ({ questionId, userAnswer })
    );

    const submissionData: SubmissionData = {
      trainingId: currentTraining._id,
      moduleId: targetModule._id,
      lessonId: quizLesson._id,
      answers: formattedAnswers,
    };

    setIsSubmitting(true);

    try {
      const success = await answerLessonQuestions(submissionData);
      if (success) {
        navigate(`/training/result/${urlModule}/${urlTraining}`);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendering functions for different question types
  const renderMultipleChoice = (question: Question) => (
    <div className="flex flex-col gap-1">
      {question.options?.map((option, index) => (
        <div
          key={index}
          className="bg-[#FAFAFA] border border-[#E3E3E3] py-3 px-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name={`question-${question._id}`}
              checked={answers[question._id] === option}
              onChange={() => handleMultipleChoiceChange(question._id, option)}
              className="w-6 h-6"
            />
            <p className="text-sm font-medium">{option}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCheckbox = (question: Question) => (
    <div className="flex flex-col gap-1">
      {question.options?.map((option, index) => (
        <div
          key={index}
          className="bg-[#FAFAFA] border border-[#E3E3E3] py-3 px-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={answers[question._id]?.includes(option)}
              onChange={(e) =>
                handleCheckboxChange(question._id, option, e.target.checked)
              }
              className="w-6 h-6"
            />
            <p className="text-sm font-medium">{option}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTextInput = (question: Question) => (
    <div className="bg-[#FAFAFA] border border-[#E3E3E3] py-3 px-4">
      <textarea
        value={answers[question._id] || ""}
        onChange={(e) => handleInputChange(question._id, e.target.value)}
        className="w-full h-32 p-2 border border-[#E3E3E3] rounded"
        placeholder="Type your answer here..."
      />
    </div>
  );

  const renderQuestion = (question: Question) => {
    switch (question.questionType) {
      case "multiple-choice":
        return renderMultipleChoice(question);
      case "checkbox":
        return renderCheckbox(question);
      case "input":
        return renderTextInput(question);
      default:
        return <p>Unknown question type: {question.questionType}</p>;
    }
  };

  // Render loading and error states
  if (!currentTraining) {
    return <div className="p-4">Loading training data...</div>;
  }

  if (!isCorrectTraining) {
    return (
      <div className="p-4">
        <p className="text-center text-red-500">
          Training "{urlModule}" not found.
        </p>
      </div>
    );
  }

  if (!targetModule) {
    return (
      <div className="p-4">
        <p className="text-center text-red-500">
          Module "{urlTraining}" not found in training "{urlModule}".
        </p>
      </div>
    );
  }

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

      {currentQuestions.map((question: Question, idx: number) => (
        <div key={question._id} className="mb-6">
          <p className="py-3 px-4 font-semibold">
            {startIndex + idx + 1}. {question.question}
          </p>
          {renderQuestion(question)}
        </div>
      ))}

      <div className="flex justify-end mt-4 gap-4">
        {currentPage > 0 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 text-sm font-medium rounded-lg w-28 border border-[#D0D5DD] bg-white text-[#333333]"
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}

        {startIndex + questionsPerPage < questions.length ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg text-sm font-medium w-28 bg-[#282EFF] text-white"
            disabled={isSubmitting}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium rounded-lg w-28 bg-[#282EFF] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TrainingQuestions;
