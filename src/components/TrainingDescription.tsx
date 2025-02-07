import React from "react";

const TrainingDescription = () => {
  return (
    <div className="w-full ">
      <div className="text-sm text-[#1B1B1B99]">
        <h1 className="text-[24px] text-[#333333] font-semibold">
          Training Description
        </h1>
        <p className="mt-7">
          This course delves into the techniques and tools used to analyze and
          understand malicious software (malware) and how it operates. Designed
          for cybersecurity professionals, this advanced-level course teaches
          participants how to detect, analyze, and mitigate malware threats in
          complex environments. Through hands-on labs and real-world case
          studies, learners will gain the skills to perform static and dynamic
          analysis, reverse engineer malware, and understand its behavior in
          different operating environments.
        </p>

        <p className="text-[#433E3F] pt-4">The course will cover: </p>
        <ul className="list-disc px-7 pb-4">
          <li>
            Types of malware: viruses, trojans, worms, ransomware, and rootkits
          </li>
          <li>Malware analysis methodologies: static vs. dynamic analysis</li>
          <li>Reverse engineering of malware binaries </li>
          <li>Understanding obfuscation and packing techniques</li>
          <li>
            Analyzing malware with tools like IDA Pro, Ghidra, and OllyDbg
          </li>
          <li>Memory forensics and examining volatile data</li>
          <li>
            Behavioural analysis to detect indicators of compromise (IoCs)
          </li>
          <li>Creating detection signatures and YARA rules</li>
        </ul>

        <p>
          By the end of the course, participants will be able to identify and
          analyze complex malware samples, develop defense strategies, and
          respond effectively to malware incidents in real-world scenarios.
          Ideal for:
        </p>

        <ul className="list-disc px-7">
          <li>Malware analysts</li>
          <li>Incident response teams</li>
          <li>Security operations center (SOC) professionals</li>
          <li>
            Cybersecurity professionals interested in advancing their threat
            detection skills
          </li>
        </ul>

        <p className="py-4">Course Duration: 16 hours</p>
        <p className="text-[#433E3F]">Mode: Online/Blended</p>
        <p>
          Prerequisites: Basic knowledge of cybersecurity and programming,
          familiarity with operating systems, and foundational understanding of
          malware.
        </p>
      </div>
    </div>
  );
};

export default TrainingDescription;
