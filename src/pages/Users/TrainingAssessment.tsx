import React from "react";
import { Link, useParams } from "react-router-dom";
import arrowleft from "../../assets/arrow-left-b.png";
import arrowright from "../../assets/arrow-right-b.png";
import TrainingQuestions from "../../components/TrainingQuestions";

const TrainingAssessment = () => {
  const { module, moduleType } = useParams<{
    module: string;
    moduleType: string;
  }>();

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 mt-5 font-poppins">
          <Link to={"/"} className="text-sm font-medium text-[#282EFF]">
            Dashboard
          </Link>
          <p>/</p>
          <Link to={"/training"} className="text-sm font-medium text-[#282EFF]">
            Training
          </Link>
          <p>/</p>
          <p className="text-sm font-medium text-[#898384]">{module}</p>
          <p>/</p>
          <p className="text-sm font-medium text-[#898384]">Content</p>
          <p>/</p>
          <p className="text-sm font-medium text-[#898384]">{moduleType}</p>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div>
              <img src={arrowleft} alt="" />
            </div>
            <p className="text-sm font-medium text-[#282EFF]">Previous</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[#282EFF]">Next</p>
            <div>
              <img src={arrowright} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* questions */}
      <div className="max-w-[906px] mx-auto">
        <p>Pick the correct answer from the options given</p>

        {/* train picks */}
        <TrainingQuestions />
      </div>
    </div>
  );
};

export default TrainingAssessment;
