import React, { useState } from "react";
import check from "../assets/check-circle.png";
import close from "../assets/svgs/close.svg";

const DisplayScores = () => {
  return (
    <div>
      <div className="bg-[#DEEFFC] my-7 py-4 px-[24px] rounded-[10px]">
        <div className="w-full bg-white border-l-4 border-l-[#0B7B69] border border-[#E4E7EC] flex gap-4 p-[20px]">
          <div>
            {/* check */}
            <div className="flex items-center justify-center w-[32px] aspect-square border border-[#C6DDF7] bg-[#E3EFFC] rounded-lg">
              <div>
                <img src={check} alt="" />
              </div>
            </div>
          </div>

          {/* text */}
          <div className="w-full border-r border-[#F0F2F5] pr-4">
            <p className="text-[#101928] font-medium">
              Congratulation! You passed!
            </p>
            <p className="text-sm text-[#475367] max-w-[865px]">
              To pass, 90% or higher
            </p>

            <div className="w-full flex items-end justify-end">
              <button className="px-4 py-2 rounded-[8px] text-sm font-medium  bg-[#282EFF] text-white">
                Keep Learning
              </button>
            </div>
          </div>

          <div className="w-[40%] flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs">Your score:</p>
              <p className="text-[24px] font-medium text-[#0B7B69]">100%</p>
              <p className="text-[#333333] font-medium">Passed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayScores;
