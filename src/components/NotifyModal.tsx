import React, { useState } from "react";
import check from "../assets/check-circle.png";
import close from "../assets/svgs/close.svg";

const NotifyModal = () => {
  const [modal, setModal] = useState(true);

  return (
    <div>
      {modal && (
        <div className="bg-[#DEEFFC] my-7 py-4 px-[24px] rounded-[10px]">
          <div className="w-full bg-white border-l-4 border-l-[#0D5EBA] border border-[#E4E7EC] flex gap-4 p-[20px]">
            <div>
              {/* check */}
              <div className="flex items-center justify-center w-[32px] aspect-square border border-[#C6DDF7] bg-[#E3EFFC] rounded-lg">
                <div>
                  <img src={check} alt="" />
                </div>
              </div>
            </div>

            {/* text */}
            <div className="w-full border-r border-[#F0F2F5]">
              <p className="text-[#101928] font-medium">
                Your training continues!
              </p>
              <p className="text-sm text-[#475367] max-w-[865px]">
                You can start by watching the video or not. Here we show you
                practical examples of what the course aims to teach. What’s
                important is making the most of each unit. Complete the
                exercises and assessments.
              </p>
            </div>

            {/* cancel */}
            <div>
              <button
                onClick={() => {
                  setModal(false);
                }}
              >
                <img src={close} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotifyModal;
