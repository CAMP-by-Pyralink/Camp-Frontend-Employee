// export default SideNav;
import { useEffect, useState } from "react";
import navIcon from "../assets/svgs/navicon.svg";
import navCloseIcon from "../assets/svgs/navclose.svg";
import alertIcon from "../assets/svgs/alertsicon.svg";
import assetIcon from "../assets/svgs/asseticon.svg";
import awarenessIcon from "../assets/svgs/awarenessicon.svg";
import deepwebIcon from "../assets/svgs/deepwebicon.svg";
import overviewIcon from "../assets/svgs/overviewIcon.svg";
import pshishingIcon from "../assets/svgs/pshishingicon.svg";
import riskIcon from "../assets/svgs/riskicon.svg";
import settingsIcon from "../assets/svgs/settingsicon.svg";
import userIcon from "../assets/svgs/usericon.svg";
import signoutIcon from "../assets/svgs/signout.svg";
import onlineStatus from "../assets/svgs/onlinestatus.svg";
import profilePic from "../assets/profilepic.png";
import upArrowIcon from "../assets/svgs/downarrgrey.svg";
import downArrowIcon from "../assets/svgs/downarrgrey.svg";
import { Link, useNavigate } from "react-router-dom";
import { useCustomization } from "../contexts/CustomizationContext";

const SideNav = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isPhishingOpen, setIsPhishingOpen] = useState(false);
  const { themeColor, logo } = useCustomization();
  const navigate = useNavigate();

  const profile = () => {
    navigate("/profile");
  };

  const navMenus = [
    { name: "Dashboard", img: overviewIcon, path: "/" },
    {
      name: "Training",
      img: awarenessIcon,
      path: "/training",
    },
    {
      name: "Phishing Scores",
      img: pshishingIcon,
      path: "/phishing-scores",
    },
    { name: "Assets", img: assetIcon, path: "/assets" },
  ];

  function toggleSubMenu(menuName: String) {
    if (menuName === "User Management") {
      setIsUserManagementOpen(!isUserManagementOpen);
    } else if (menuName === "Phishing Stimulation") {
      setIsPhishingOpen(!isPhishingOpen);
    }
  }

  function adjustColor(hex: string, amount: number) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Adjust the color by moving towards 255 to make it lighter
    r = Math.min(250, r + amount);
    g = Math.min(220, g + amount);
    b = Math.min(155, b + amount);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // Usage example
  // const themeColor = "#3498db"; // Original color
  const darkerThemeColor = adjustColor(themeColor, 21); // Amount to make it lighter
  console.log(themeColor); // Original color
  // console.log(lighterThemeColor); // Lighter color

  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  return (
    <div
      className={`custom-scrollbar h-screen overflow-y-auto overflow-x-hidden px-4 py-6 bg-primary10 text-white flex flex-col gap-4 transition-width duration-300 ${
        isCollapsed ? "w-[100px]" : "w-[294px]"
      }`}
      style={{ background: themeColor }}
    >
      {/* Logo */}
      <div className=" flex items-center justify-center mb-8">
        <div
          className={`flex relative items-center ${
            isCollapsed ? "gap-0" : "gap-8"
          } `}
        >
          <div
            className={`text-white flex flex-col transition-all duration-300`}
          >
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className={`w-full  h-[50px] object-cover ${
                  isCollapsed ? " w-[30px]" : ""
                }`}
              />
            ) : (
              <h1
                className={`font-semibold leading-[49.2px] tracking-[-2%] ${
                  isCollapsed ? "text-[41px] ml-4 " : "text-[41px]"
                }`}
              >
                {isCollapsed ? "C" : "CAMP"}
              </h1>
            )}
            {!isCollapsed && (
              <p className="italic text-[13px] leading-[15.6px] tracking-[-2%]">
                by Pyralink Innovation
              </p>
            )}
          </div>
          <img
            className={`cursor-pointer ${isCollapsed ? " pt-1" : "block"}`}
            src={isCollapsed ? navCloseIcon : navIcon}
            alt="Navigation Icon"
            width={24}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {navMenus.map((navMenu, index) => (
          <div key={index}>
            <Link to={`${navMenu.path}`}>
              <div
                className={`flex items-center gap-4 p-2 cursor-pointer py-3 px-4 
            ${
              activeMenu === navMenu.name
                ? "bg-opacity-100 bg-hover text-white"
                : "bg-transparent text-[#C6DDF7]"
            } 
            hover:bg-opacity-80 hover:bg-hover hover:text-white`}
                style={{
                  background:
                    activeMenu === navMenu.name
                      ? darkerThemeColor
                      : "transparent",
                }}
                onClick={() => setActiveMenu(navMenu.name)}
              >
                <img
                  src={navMenu.img}
                  alt={`${navMenu.name} Icon`}
                  className="min-w-[18px]"
                />
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <h1
                      className={`${
                        activeMenu === navMenu.name
                          ? "text-white text-[15px]"
                          : "text-sm text-[#C6DDF7]"
                      }`}
                    >
                      {navMenu.name}
                    </h1>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Sign out section */}
      <div
        className={`flex flex-col mt-auto ${
          isCollapsed ? "flex-col gap-4" : "flex-row"
        }`}
      >
        <button
          className="flex items-center gap-2 relative px-3 hover:bg-[#282EFF] py-3"
          onClick={profile}
        >
          <div className="relative">
            <div className="w-[40px] aspect-square rounded-full">
              <img src={profilePic} alt="" className="w-full h-full" />
            </div>
            <img
              src={onlineStatus}
              alt="Online Status"
              className="absolute bottom-0 right-0"
              width={10}
              height={10}
            />
          </div>

          {!isCollapsed && (
            <div>
              <h1 className="text-sm font-semibold">Flutter</h1>
              <h1 className="text-sm">Employee</h1>
            </div>
          )}
        </button>
        <div className="flex items-center gap-4 text-white my-10 px-4">
          <img src={signoutIcon} alt="Sign Out" width={20} height={20} />
          <p className="text-sm font-semibold">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
