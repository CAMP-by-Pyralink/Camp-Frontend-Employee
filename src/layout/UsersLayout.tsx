import { Outlet } from "react-router-dom";
import SideNav from "../shared/SideNav";
import TopSection from "../shared/TopSection";
import ClipLoader from "react-spinners/ClipLoader"; // Example spinner
import DelayedSuspense from "../shared/DelayedSuspense";
import { useCustomization } from "../contexts/CustomizationContext";
import { useState } from "react";
import CustomizationSetting from "../shared/CustomizationSetting";

const UsersLayout = () => {
  const { font, fontSize, themeColor } = useCustomization();

  const [openCustomizationSetting, setOpenCustomizationSetting] =
    useState(false);
  // const [searchVisible, setSearchVisible] = useState(true);

  const handleCustomizationClick = () => {
    setOpenCustomizationSetting((prev) => !prev);
  };
  const [customizationOpen, setCustomizationOpen] = useState(false);
  return (
    <div
      className="flex h-screen"
      style={{ fontFamily: font, fontSize: `${fontSize}px` }}
    >
      {/* SideNav */}
      <div className="relative z-30 h-fit bg-gray-100">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full ">
        {/* TopSection */}
        <div className="bg-[#fafafa] px-8 py-4">
          <TopSection handleCustomizationClick={handleCustomizationClick} />
        </div>

        {/* Content with scroll */}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-8 py-4">
          {/* Use DelayedSuspense for a minimum loading duration */}
          <DelayedSuspense
            fallback={
              <div className="loading-container">
                <ClipLoader size={50} color="#123abc" />
              </div>
            }
            delay={1500}
          >
            <div className=" bgred">
              {/* <div className="bg-white px-8 py-4">
                <TopSection
                  handleCustomizationClick={handleCustomizationClick}
                />
              </div> */}
              <Outlet />
            </div>
            {/* <div>
              {searchVisible && (
                <div className=" h-80 w-96 absolute top-0 bg-red-900"></div>
              )}
            </div> */}
          </DelayedSuspense>
        </div>
        {/* Conditionally render CustomizationSetting */}
        {openCustomizationSetting && (
          <CustomizationSetting
            customizationOpen={customizationOpen}
            handleCustomizationClick={handleCustomizationClick}
          />
        )}
      </div>
    </div>
  );
};

export default UsersLayout;
