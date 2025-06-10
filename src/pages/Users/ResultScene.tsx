import TrainingResults from "../../components/TrainingResults";
import DisplayScores from "../../components/DisplayScores";

const ResultsScene = () => {
  return (
    <div className="font-poppins">
      <div>
        <DisplayScores />
        <TrainingResults />
      </div>
    </div>
  );
};

export default ResultsScene;
