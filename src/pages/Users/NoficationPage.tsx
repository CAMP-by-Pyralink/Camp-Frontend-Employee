import React from "react";
import close from "../../assets/close-circle.png";
import filter from "../../assets/filter.png";
import search from "../../assets/search.png";
import { useNavigate } from "react-router-dom";

const NoficationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-poppins text-[#333333]">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[#454545]">3 unread notifications</h1>

          <div className="">
            <button className=" px-[12px] py-[10px] border border-[#CCCBCB] rounded flex items-center gap-2">
              <div>
                <img src={close} alt="" />
              </div>

              <p
                className="text-sm font-semibold"
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </p>
            </button>
          </div>
        </div>

        {/* search */}
        <div className="flex items-center gap-10 mt-5">
          <div className="flex items-center gap-2 w-[644px] border-[0.5px] border-[#898384] px-[20px] py-[10px] rounded">
            <div>
              <div>
                <img src={search} alt="" />
              </div>
            </div>
            <input
              type="text"
              className=" outline-none placeholder:text-[#898384] border-l border-[#CCCBCB] w-full px-2"
              placeholder="Search"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div>
                <img src={filter} alt="" />
              </div>

              <p>Filter by</p>
            </div>

            <div>
              <button className=" px-[12px] py-[10px] border border-[#CCCBCB] rounded flex items-center gap-2 ">
                <p className="text-sm font-semibold">Unread</p>
                <div>
                  <img src={close} alt="" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* fiter result */}
        <div className="flex items-center gap-7 my-10">
          <div>
            <button className=" px-[12px] py-[10px] border border-[#CCCBCB] rounded flex items-center gap-2">
              <p className="text-sm font-semibold">Unread</p>
              <div>
                <img src={close} alt="" />
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <p>Clear</p>

            <div>
              <img src={close} alt="" />
            </div>
          </div>
        </div>

        {/* notifo */}
        <div className="flex flex-col gap-7">
          <div className="bg-white border border-[] shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-[20px]">
            <h1 className="font-medium">Overdue Training Reminder</h1>

            <div className="w-full flex items-center justify-between mt-4">
              <p> “Your 'Cybersecurity' training is overdue by 2 days.</p>

              <div className="flex items-center justify-center gap-4">
                <button className=" bg-[#282EFF] text-white flex items-center gap-2 justify-center w-[126px] text-sm font-medium px-[12px] py-[10px] rounded">
                  Review Details
                </button>
                <button className=" border border-[#CCCBCB] text-[#433E3F] flex items-center justify-center gap-2 text-sm font-medium px-[12px] py-[10px] rounded">
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          {/* notify 2 */}
          <div className="bg-white border border-[] shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-[20px]">
            <h1 className="font-medium">Overdue Training Reminder</h1>

            <div className="w-full flex items-center justify-between">
              <p> “Your 'Cybersecurity' training is overdue by 2 days.</p>

              <div className="flex items-center justify-center gap-4">
                <button className=" bg-[#282EFF] text-white flex items-center gap-2 justify-center w-[126px] text-sm font-medium px-[12px] py-[10px] rounded">
                  Review Details
                </button>
                <button className=" border border-[#CCCBCB] text-[#433E3F] flex items-center justify-center gap-2 text-sm font-medium px-[12px] py-[10px] rounded">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoficationPage;
