import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/train1.png";
import TrainingDescription from "../../components/TrainingDescription";
import TrainingModules from "../../components/TrainingModules";
import { useTabs } from "../../utils/TabContext";
import VideoPlayer from "../../components/VideoPlayers";
import TrainingDescription1 from "../../components/TrainingDescription1";
import NotifyModal from "../../components/NotifyModal";

const TrainingModule = () => {
  const { activeTab } = useTabs();

  return (
    <div className="font-poppins relative">
      <div className="absolute">
        <div className="flex items-center gap-4 mt-5 font-poppins">
          <Link to={"/"} className="text-sm font-medium text-[#282EFF]">
            Dashboard
          </Link>
          <p>/</p>
          <Link to={"/training"} className="text-sm font-medium text-[#282EFF]">
            Training
          </Link>
          <p>/</p>
          <p className="text-sm font-medium text-[#898384]">
            Cybersecurity for beginners
          </p>
        </div>

        {/* modal */}
        <NotifyModal />

        {activeTab === 0 && (
          <div className="w-full flex items-center justify-center gap-5 bg-[#EBECFF] mt-6 rounded-[24px] px-[50px] py-[47px]">
            <div className="text-[#333333]">
              <h1 className="font-semibold text-[56px] leading-[56px] max-w-[488px]">
                Cybersecurity for beginners
              </h1>
              <p className="font-medium mt-3">8 modules, 26 lessons</p>
              <p className="text-sm">8 hours</p>
            </div>

            <div>
              <div className="w-[428px] h-[244px] overflow-hidden rounded-[30px]">
                <img className="w-full h-full object-cover" src={img1} alt="" />
              </div>
            </div>
          </div>
        )}

        {/* trainings */}
        <div className="relative w-full">
          <div className="w-full flex gap-10 mt-10">
            <div className="w-full">
              {activeTab === 0 && <TrainingDescription />}
              {activeTab === 1 && <TrainingDescription1 />}
            </div>
            <div className="w-[70%]">
              <TrainingModules />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
