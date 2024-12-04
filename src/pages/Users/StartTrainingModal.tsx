import React from "react";
import book from "../../assets/book-square.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const StartTrainingModal = () => {
  const { module, moduleType } = useParams<{
    module: string;
    moduleType: string;
  }>();

  const navigate = useNavigate();

  const assessment = () => {
    navigate(`/training/assesment/${module}/${moduleType}`);
  };
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[505px] mt-[5rem] border border-[#E3E3E3] p-[30px] rounded-[10px]">
          <div className="w-[64px] aspect-square rounded-full flex items-center justify-center bg-[#F9F5FF]">
            <div>
              <img src={book} alt="" />
            </div>
          </div>

          {/* text */}
          <div className="font-medium py-4">
            <h1 className="text-[28px]">Ready to start your assessment?</h1>
            <div className="pt-2">
              <p>You have only three retries</p>
              <p className="py-1">The minimum score to pass is 90%</p>
              <p>Please ensure that you have a stable network connection</p>
            </div>
          </div>

          {/* buttons */}
          <div className="w-full flex items-center justify-between pt-2">
            <button
              className="font-medium text-white border border-[#282EFF] rounded-lg px-4 py-2 bg-[#282EFF] "
              onClick={assessment}
            >
              Go to assessment
            </button>
            <button className="font-medium text-[#282EFF] border border-[#282EFF] rounded-lg px-4 py-2 bg-white">
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTrainingModal;
