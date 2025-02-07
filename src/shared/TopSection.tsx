import { useEffect, useRef, useState } from "react";
import profilePic from "../assets/profilepic.png";
import settings from "../assets/svgs/settings.svg";
import notify from "../assets/notify.png";
import Notification from "../utils/Notification";
// import CustomizationSetting from "./CustomizationSetting";
const TopSection = ({
  handleCustomizationClick,
}: {
  handleCustomizationClick: () => void;
}) => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setNotificationVisible(true);
  };

  const handleMouseLeave = () => {
    // Do not hide here, we will handle it with click away
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setNotificationVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" flex justify-end gap-[40%] relative">
      {/* searchbox */}
      <div className="w-[593px]">
        <input
          type="text"
          className=" outline-none border-[0.5px] px-4 py-2 placeholder:text-[#898384] border-[#898384] w-full rounded "
          placeholder="Search"
        />
      </div>
      {/* profile */}
      <div className=" flex gap-4 items-center">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <div className="cursor-pointer">
            <img src={notify} alt="notification icon" />
          </div>

          {isNotificationVisible && (
            <div ref={notificationRef}>
              <Notification text="You have a new message!" time="2 mins ago" />
            </div>
          )}
        </div>
        <img src={profilePic} alt="" className="  w-[36px] h-[36px]" />
        <img
          src={settings}
          alt=""
          className=" w-[24px] h-[24px]"
          onClick={handleCustomizationClick}
        />
      </div>
    </div>
  );
};

export default TopSection;
