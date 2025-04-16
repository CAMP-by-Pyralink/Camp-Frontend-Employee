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

  const handleButtonClick = (training: (typeof trainings)[0]) => {
    switch (training.buttonLabel) {
      case "Start Training":
        navigate(`/training/${training._id}`);
        console.log("clicked", training._id);
        break;
      case "View Badge":
        handleTab("2");
        break;
      case "Resume Training":
        navigate(`/training/${training.module}`);
        break;
      case "Retake Training":
        navigate(`/training/${training.module}`);
        break;
      default:
        break;
    }
  };
  const handleStartClick = (training: any) => {
    // Call the getSingleTraining method from the store
    getSingleTraining(training._id);
    //
    navigate(`/training/${training._id}`);
    console.log(training);
  };
  console.log(trainings);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        {trainings.map((training) => (
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
                <span className=" text-textColor text-xl font-medium">
                  {training.totalScore}%
                </span>
                <p
                  className={`${
                    training.status === "Pending" ||
                    training.status === "Not Started"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  {training.totalScore === 100 && "Passed"}
                </p>
              </div>
              <div className=" w-full">
                {/* <button
                  onClick={() => handleButtonClick(training)}
                  className={` ${
                    training.status === "Completed" && training.score <= 50
                      ? "text-[#B30100]"
                      : training.status === "Completed" && training.score >= 50
                      ? "border border-[#282EFF] text-[#282EFF]"
                      : "bg-[#282EFF] text-white"
                  }  flex items-center gap-4 text-sm font-medium px-[12px] py-[10px] rounded`}
                >
                  {training.buttonLabel}
                  <img
                    src={
                      training.status === "Completed" && training.score <= 50
                        ? retake
                        : training.status === "Completed" &&
                          training.score >= 50
                        ? badge
                        : arrow
                    }
                    alt=""
                  />
                </button> */}
                <button
                  className="bg-[#282EFF] w-fit text-white  items-center gap-4 text-xs font-medium px-[12px] py-[10px] rounded"
                  onClick={() => handleStartClick(training)}
                >
                  Start Training
                  {/* <img src={arrow} alt="" width={} /> */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingTab1;
