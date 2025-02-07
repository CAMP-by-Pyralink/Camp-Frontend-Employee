import React from "react";
import VideoPlayer from "./VideoPlayers";

const TrainingDescription1 = () => {
  return (
    <div className="w-full">
      <div className="text-sm text-[#1B1B1B99]">
        <h1 className="text-[24px] text-[#333333] font-semibold">
          Training Description
        </h1>

        <VideoPlayer />
        <p className="mt-7">
          This course delves into the techniques and tools used to analyze and
          understand malicious software (malware) and how it operates. Designed
          for cybersecurity professionals, this advanced-level course teaches
          participants how to detect, analyze, and mitigate malware threats in
          complex environments.
        </p>
      </div>
    </div>
  );
};

export default TrainingDescription1;
