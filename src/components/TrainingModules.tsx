import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dropdown from "../assets/dropdown.png";
import dropup from "../assets/dropup.png";
import video from "../assets/video.png";
import book from "../assets/book.png";
import assess from "../assets/assess.png";
import { useTabs } from "../utils/TabContext";
import { useNavigate } from "react-router-dom";
import { useTrainingStore } from "../store/useTraining";

interface TrainingModulesProps {
  currentTraining: any; // Replace 'any' with the appropriate type for currentTraining
}

const TrainingModules = ({ currentTraining }: TrainingModulesProps) => {
  const { switchTab } = useTabs();
  const percentage = 66;
  const navigate = useNavigate();

  const startAssessment = (module: string, moduleType: string) => {
    navigate(`/training/start-assesment/${module}/${moduleType}`);
  };

  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full px-[28px]">
      <div className="w-full ">
        <div>
          <h1 className="text-[24px] text-[#333333] font-semibold">Modules</h1>
        </div>

        <div className="border border-[#B5B3B3] py-[10px] px-[20px] mt-5">
          <div className="flex items-center justify-between w-full">
            <div>
              <p>Module 1</p>
            </div>

            <div className="flex items-center gap-5">
              <div style={{ width: 45, height: 45 }}>
                <CircularProgressbar
                  value={percentage}
                  styles={buildStyles({
                    textSize: "30px",
                  })}
                  text={`${percentage}%`}
                />
              </div>

              <div>
                <div>
                  <button onClick={() => toggleDropdown(1)}>
                    <img
                      src={openDropdowns[1] ? dropup : dropdown}
                      alt="Toggle dropdown"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown content */}
          {openDropdowns[1] && (
            <div className="flex flex-col gap-2">
              <button
                className="flex items-center gap-2"
                onClick={() => switchTab(0)}
              >
                <div>
                  <img src={video} alt="" />
                </div>
                <p className="text-xs">Introduction</p>
              </button>
            </div>
          )}
        </div>

        <div className="border border-[#B5B3B3] py-[10px] px-[20px] mt-4">
          <div className="flex items-center justify-between w-full">
            <div>
              <p>Module 2</p>
            </div>

            <div className="flex items-center gap-5">
              <div style={{ width: 45, height: 45 }}>
                <CircularProgressbar
                  value={percentage}
                  styles={buildStyles({
                    textSize: "30px",
                  })}
                  text={`${percentage}%`}
                />
              </div>

              <div>
                <div>
                  <button onClick={() => toggleDropdown(2)}>
                    <img
                      src={openDropdowns[2] ? dropup : dropdown}
                      alt="Toggle dropdown"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown content */}
          {openDropdowns[2] && (
            <div className="flex flex-col gap-2">
              <button
                className="flex items-center gap-2"
                onClick={() => switchTab(1)}
              >
                <div>
                  <img src={video} alt="" />
                </div>
                <p className="text-xs">What is risk?</p>
              </button>
              <button
                className="flex items-center gap-2"
                onClick={() => switchTab(2)}
              >
                <div>
                  <img src={book} alt="" />
                </div>
                <p className="text-xs">Types of risk?</p>
              </button>
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  startAssessment("Cybersecurity", "Module2");
                }}
              >
                <div>
                  <img src={assess} alt="" />
                </div>
                <p className="text-xs">Assessment</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingModules;
