import React from "react";
import { Link, useNavigate } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import arrow from "../../assets/svgs/arrow-right.svg";
import shield from "../../assets/shield.png";

const PhisingReport = () => {
  const navigate = useNavigate();
  return (
    <div className="font-poppins">
      <div className="border font-poppins border-dotted border-black rounded-lg p-[10px] max-w-[882px] mx-auto">
        <div className="flex items-center gap-4 pl-4">
          <p className="flex items-center gap-2 text-[#333333] font-medium text-[20px]">
            Incident Report -{" "}
            <span className="text-base font-normal">
              Phishing Attack Detected
            </span>
          </p>
          <div>
            <div>
              <img src={shield} alt="" />
            </div>
          </div>
        </div>

        <div className="my-7 pl-4 text-sm font-medium flex flex-col gap-1">
          <p>
            Date & Time:{" "}
            <span className="font-normal">November 20, 2024, 3:15PM</span>
          </p>
          <p>
            Phishing Method:{" "}
            <span className="font-normal">
              Fake password expiration notice page mimicking "Internal Email
              Portal
            </span>
          </p>
          <p>
            Impact:{" "}
            <span className="font-normal">
              Your credentials were entered on a malicious site.
            </span>
          </p>
        </div>

        <div className="bg-[#F8FAFE] py-[20px]">
          <div className="bg-white w-[452px] mx-auto px-[28px] py-[22px]">
            <p>Password Expiration Notice</p>

            <div className="my-7">
              <img className="w-full h-full" src={thumbnail} alt="" />
            </div>

            <div className="text-[13px]">
              <p>Dear Olajide</p>
              <p>
                We have noticed unusual activity in your bank account and need
                you to verify your identity to ensure your account remains
                secure. Please click the link below to review the activity and
                verify your account:
              </p>
              <Link to={""} className="text-[#0007FC] text-[13px] underline">
                Verify Now
              </Link>

              <p className="py-7">
                If this action is not taken within 24 hours, your account may be
                restricted.
              </p>

              <p>Best regards,</p>
              <p className="text-[#864DE0]">
                Bank of America, Fraud Department
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-4 justify-center mt-4 pl-4">
          <p className="w-full font-medium">
            Recommended Training -{" "}
            <span className="font-normal">
              Please take this course so as to understand and review the
              possible ways phishing can occur and how to evade it.
            </span>
          </p>

          <div className="w-[30%]">
            <button
              onClick={() => {
                navigate("/start-training");
              }}
              className="bg-[#282EFF] text-white
              flex items-center gap-4 text-sm font-medium px-[12px] py-[10px] rounded"
            >
              Start training
              <img src={arrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhisingReport;
