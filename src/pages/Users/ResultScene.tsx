import React from "react";
import NotifyModal from "../../components/NotifyModal";
import TrainingResults from "../../components/TrainingResults";
import DisplayScores from "../../components/DisplayScores";

const ResultsScene = () => {
  return (
    <div>
      <div>
        <DisplayScores />
        <TrainingResults />
      </div>
    </div>
  );
};

export default ResultsScene;
