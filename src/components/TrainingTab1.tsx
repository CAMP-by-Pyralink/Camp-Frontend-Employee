import img1 from "../assets/train1.png";
import arrow from "../assets/svgs/arrow-right.svg";
import badge from "../assets/award.png";
import retake from "../assets/refresh-2.png";
import { useNavigate } from "react-router-dom";

interface BadgeTabProps {
  handleTab: (tab: string) => void;
}

const TrainingTab1 = ({ handleTab }: BadgeTabProps) => {
  const navigate = useNavigate();

  const trainings = [
    {
      id: 1,
      title: "Cybersecurity for Beginners",
      description: "A score of at least 50% is needed to pass this training",
      score: 0,
      status: "Not Started",
      progress: 0,
      buttonLabel: "Start Training",
      module: "cybersecurity",
    },
    {
      id: 2,
      title: "Risk Assessment Training",
      description: "A score of at least 50% is needed to pass this training",
      score: 100,
      status: "Completed",
      progress: 100,
      buttonLabel: "View Badge",
      module: "risk-assessment",
    },
    {
      id: 3,
      title: "Security Awareness",
      description: "A score of at least 50% is needed to pass this training",
      score: 45,
      status: "Pending",
      progress: 45,
      buttonLabel: "Resume Training",
      module: "security-awareness",
    },
    {
      id: 4,
      title: "Phishing Training",
      description: "A score of at least 50% is needed to pass this training",
      score: 20,
      status: "Completed",
      progress: 100,
      buttonLabel: "Retake Training",
      module: "phishing",
    },
  ];

  const handleButtonClick = (training: (typeof trainings)[0]) => {
    switch (training.buttonLabel) {
      case "Start Training":
        navigate(`/training/${training.module}`);
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

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        {trainings.map((training) => (
          <div
            key={training.id}
            className="bg-white py-4 px-[20px] rounded-md flex items-center gap-20"
          >
            {/* Image and Title */}
            <div className="flex gap-3 w-full">
              <div>
                <div className="w-[190px] aspect-square overflow-hidden">
                  <img
                    src={img1}
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
                  {training.description}
                </p>
                <div className="w-full rounded-[20px] bg-[#F0F2F5] h-[12px]">
                  <div
                    style={{ width: `${training.progress}%` }}
                    className={`rounded-[20px] ${
                      training.progress >= 50 ? "bg-[#15B097]" : "bg-[#F56630]"
                    } h-[12px]`}
                  ></div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-[#475367]">Progress</p>
                  <p className="text-sm text-[#475367]">{training.progress}%</p>
                </div>
              </div>
            </div>
            {/* Score and Button */}
            <div className="flex w-[40%] items-center justify-between gap-10">
              <div className="text-center">
                <p className="text-sm text-[#333333]">Your score:</p>
                <p
                  className={`text-[24px] font-medium ${
                    training.status === "Pending"
                      ? "text-black"
                      : training.status === "Not Started"
                      ? "text-black"
                      : training.score <= 50
                      ? "text-[#B30100]"
                      : "text-[#0B7B69]"
                  }`}
                >
                  {training.status === "Pending" ? "N/A" : `${training.score}%`}
                </p>

                <p
                  className={`${
                    training.status === "Pending" ||
                    training.status === "Not Started"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  {training.score <= 50 ? "Failed" : "Passed"}
                </p>
              </div>
              <div>
                <button
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
