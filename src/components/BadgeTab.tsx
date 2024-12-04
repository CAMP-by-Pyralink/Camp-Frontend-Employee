import React from "react";
import arrow from "../assets/svgs/arrow-right.svg";
import img1 from "../assets/train1.png";
import badge from "../assets/badge.png";

interface BadgeTabProps {
  handleTab: (tab: string) => void;
}

const BadgeTab = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        {/* training question */}
        <div className="bg-white py-4 px-[20px] rounded-md flex items-center gap-20">
          {/* image / title */}
          <div className="flex gap-3 w-full">
            {/* image */}
            <div>
              <div className="w-[190px] aspect-square overflow-hidden">
                <img src={img1} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

            {/* title */}
            <div className=" w-full p-4 border-r border-[#D4D5FF] h-fit">
              <h1 className="text-sm font-medium text-[#282EFF]">
                Cybersecurity for beginners
              </h1>
              <p className="py-3 text-xs text-[#333333] flex items-center gap-5">
                Your score:{" "}
                <span className="text-[#0B7B69] font-medium">91%</span>
              </p>
              <p className="py-3 text-xs text-[#333333] flex items-center gap-5">
                Completed on: <span className="text-[]">August 14,2024</span>
              </p>
            </div>
          </div>

          {/* score / button */}
          <div className="flex w-[50%] items-center justify-between gap-10">
            {/* score */}
            <div className="">
              <div>
                <img src={badge} alt="" />
              </div>
            </div>

            {/* button */}
            <div>
              <button className=" bg-[#282EFF] text-white flex items-center gap-4 text-sm font-medium px-[12px] py-[10px] rounded">
                <img src={arrow} alt="" />
                Download certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeTab;
