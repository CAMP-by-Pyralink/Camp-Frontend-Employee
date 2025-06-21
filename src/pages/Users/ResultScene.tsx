import TrainingResults from "../../components/TrainingResults";
import DisplayScores from "../../components/DisplayScores";
import { useParams } from "react-router-dom";
import { useTrainingStore } from "../../store/useTraining";
import { useEffect } from "react";
import Loader from "../../shared/Loader";

const ResultsScene = () => {
  const { module: urlModule, moduleType: urlTraining } = useParams();
  const { getAnswers, isLoading, answers, currentTraining } =
    useTrainingStore();

  // Find the target module and lesson IDs
  const targetModule = currentTraining?.modules?.find(
    (mod: any) => mod.moduleTitle === urlTraining
  );

  const quizLesson = targetModule?.lessons?.find(
    (lesson: any) =>
      lesson.lessonType.toLowerCase() === "quiz" ||
      (lesson.questions && lesson.questions.length > 0)
  );

  useEffect(() => {
    // Fetch answers when component mounts
    if (currentTraining?._id && targetModule?._id && quizLesson?._id) {
      const requestData = {
        trainingId: currentTraining._id,
        moduleId: targetModule._id,
        lessonId: quizLesson._id,
      };
      getAnswers(requestData);
    }
  }, [currentTraining, targetModule, quizLesson, getAnswers]);

  if (isLoading) return <Loader />;
  return (
    <div className="font-poppins">
      <div>
        <DisplayScores answers={answers} />
        <TrainingResults answers={answers} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ResultsScene;
