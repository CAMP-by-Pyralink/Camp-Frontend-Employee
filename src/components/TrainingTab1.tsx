import img1 from "../assets/train1.png";
import arrow from "../assets/svgs/arrow-right.svg";
import badge from "../assets/award.png";
import retake from "../assets/refresh-2.png";
import { useNavigate } from "react-router-dom";
import { useTrainingStore } from "../store/useTraining";
import { useEffect } from "react";

interface BadgeTabProps {
  handleTab: (tab: string) => void;
}

const TrainingTab1 = ({ handleTab }: BadgeTabProps) => {
  const navigate = useNavigate();
  const { getAllTrainings, trainings, isLoading, getSingleTraining } =
    useTrainingStore();

  useEffect(() => {
    getAllTrainings(1);
  }, []);

  // Function to determine button properties based on completion and score
  const getButtonProperties = (training: (typeof trainings)[0]) => {
    const { overallCompletion, totalScore } = training;

    if (overallCompletion === 100) {
      if (totalScore >= 50) {
        return {
          label: "View Badge",
          style: "border border-[#282EFF] text-[#282EFF] bg-white",
          icon: badge,
          action: () => handleTab("2"),
        };
      } else {
        return {
          label: "Retake Training",
          style: "text-[#B30100] bg-white border border-[#B30100]",
          icon: retake,
          action: () => handleStartClick(training),
        };
      }
    } else if (overallCompletion === 0 && totalScore > 0) {
      return {
        label: "Resume Training",
        style: "bg-[#F56630] text-white",
        icon: arrow,
        action: () => handleStartClick(training),
      };
    } else {
      // overallCompletion === 0 && totalScore === 0
      return {
        label: "Start Training",
        style: "bg-[#282EFF] text-white",
        icon: arrow,
        action: () => handleStartClick(training),
      };
    }
  };

  const handleStartClick = (training: any) => {
    // Call the getSingleTraining method from the store
    getSingleTraining(training._id);
    navigate(`/training/${training._id}`);
    console.log(training);
  };

  console.log(trainings);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        {trainings.map((training) => {
          const buttonProps = getButtonProperties(training);

          return (
            <div
              key={training._id}
              className="bg-white py-4 px-[20px] rounded-md flex items-center gap-20"
            >
              {/* Image and Title */}
              <div className="flex gap-3 w-full">
                <div>
                  <div className="w-[190px] aspect-square overflow-hidden">
                    <img
                      src={training.bannerImage}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full p-4 border-r border-[#D4D5FF] h-fit">
                  <h1 className="text-sm font-medium text-[#282EFF]">
                    {training.title}
                  </h1>
                  <p className="py-3 text-xs text-[#333333]">
                    {training.description.slice(0, 30)}
                  </p>
                  <div className="w-full rounded-[20px] bg-[#F0F2F5] h-[12px]">
                    <div
                      style={{ width: `${training.overallCompletion}%` }}
                      className={`rounded-[20px] ${
                        training.overallCompletion >= 50
                          ? "bg-[#15B097]"
                          : "bg-[#F56630]"
                      } h-[12px]`}
                    ></div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-[#475367]">Progress</p>
                    <p className="text-sm text-[#475367]">
                      {training.overallCompletion}%
                    </p>
                  </div>
                </div>
              </div>
              {/* Score and Button */}
              <div className="flex w-[40%] items-center justify-between gap-10">
                <div className="text-center w-full">
                  <p className="text-sm text-[#333333] mb-2">Your score:</p>
                  <span className="text-textColor text-xl font-medium">
                    {Math.round(training.totalScore)}%
                  </span>

                  {/* Show status based on completion and score */}
                  {training.overallCompletion === 100 && (
                    <p
                      className={
                        training.totalScore >= 50
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {training.totalScore >= 50 ? "Passed" : "Failed"}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <button
                    className={`${buttonProps.style} flex items-center gap-4 text-xs font-medium px-[12px] py-[10px] rounded w-fit`}
                    onClick={buttonProps.action}
                  >
                    {buttonProps.label}
                    <img src={buttonProps.icon} alt="" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingTab1;
