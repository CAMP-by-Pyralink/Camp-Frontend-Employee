import React from "react";
import filterIcon from "../../assets/svgs/filtericon.svg";
import TrainingsTab from "../../components/TrainingsTab";

const Training = () => {
  return (
    <div className="font-poppins">
      <div>
        <div className="text-[#444444] px-4 py-6">
          <p className="font-medium text-[24px]">Training</p>
          <p>Here's a List of trainings assigned to you</p>
        </div>
        <div className="bg-white rounded-md w-full pb-10 px-[20px]">
          <div className="flex items-center justify-between">
            <div className="px-4 flex items-center gap-3 border-b-[0.5px] border-[#333333] w-[372px]">
              <input type="text" placeholder="Search" className="py-2 w-full" />
            </div>
          </div>
        </div>
      </div>
      <TrainingsTab />
    </div>
  );
};

export default Training;
