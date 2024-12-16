import logoIcon from "../assets/svgs/logoicon.svg";
import downArrow from "../assets/svgs/downarrfilled.svg";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Slider from "@mui/material/Slider";
import { useRef, useState } from "react";
import { useCustomization } from "../contexts/CustomizationContext";
import closeIcon from "../assets/svgs/close.svg";
import NotificationPreference from "../components/NotificationPreference";
import LanguageGeoLocation from "../components/LanguageGeoLocation";
import PrivacySettings from "../components/PrivacySettings";

type CustomizationSettingProps = {
  handleCustomizationClick: () => void; // Adjust this type based on the function's signature
  customizationOpen: boolean;
};

const CustomizationSetting: React.FC<CustomizationSettingProps> = ({
  handleCustomizationClick,
  customizationOpen,
}) => {
  const [value, setValue] = useState<number>(30);
  const [selectedColor, setSelectedColor] = useState("Default");
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    logo,
    font,
    themeColor,
    setLogo,
    setFont,
    // setFontSize,
    setThemeColor,
  } = useCustomization();

  const [hexCode, setHexCode] = useState<string>(themeColor);

  // // Handle slider change
  // const handleChange = (newValue: number | number[]) => {
  //   setValue(newValue as number);
  //   setFontSize(newValue as number); // Update the font size
  // };

  // Handle file upload for logo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string); // Set the uploaded logo
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle hex color change for theme
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHexCode(newHex); // Update hex input state
    setThemeColor(newHex); // Set the new theme color
  };

  const handleFontChange = (selectedFont: string) => {
    setFont(selectedFont);
    setIsOpen(false); // Close dropdown after selection
    // Update placeholder text to selected font name
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.placeholder = selectedFont;
    }
  };

  // Predefined color themes
  const colorThemes = [
    {
      name: "Default",
      color: "#00037B",
    },
    {
      name: "Black",
      color: "#0A0A0B",
    },
    {
      name: "Sky Blue",
      color: "#147BC5",
    },
    {
      name: "Green",
      color: "#0B7B69",
    },
    {
      name: "Orange",
      color: "#CC7914",
    },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const popularFonts = [
    "Arial",
    "Courier New",
    "Georgia",
    "Helvetica",
    "Impact",
    "Inter",
    "Poppins",
    "Roboto",
    "Times New Roman",
    "Verdana",
  ];

  return (
    <div className="bg-[#F6F6F6] px-4 py-4 absolute z-50 right-8 top-[68px] w-fit h-[89.3%] overflow-y-scroll">
      <div className="flex flex-col mb-4 pb-4 border-[#DDDDDD] border-b">
        <div className=" flex items-center justify-between">
          <h1 className=" text-xl text-black">Settings</h1>
          <img
            src={closeIcon}
            alt=""
            className="cursor-pointer"
            onClick={handleCustomizationClick}
          />
        </div>
        <p className=" text-[#333333] text-xs font-medium">
          Customize and edit your settings
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Logo*/}

        {/* Select font size */}
        {/* <div>
            <h1 className="text-[#101928] font-medium mt-4">
              Select a Font Size
            </h1>
            <div>
              <Box sx={{ width: 200 }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ alignItems: "center", mb: 1 }}
                >
                  <Slider
                    aria-label="Font size"
                    value={value}
                    onChange={(_, newValue) => handleChange(newValue)}
                    valueLabelDisplay="on"
                    min={12}
                    max={48}
                  />
                </Stack>
              </Box>

              <div className="flex gap-4 text-xs mt-2">
                <span style={{ fontSize: "12px" }}>Aa</span>
                <span style={{ fontSize: "24px" }}>Aa</span>
                <span style={{ fontSize: "36px" }}>Aa</span>
                <span style={{ fontSize: "48px" }}>Aa</span>
              </div>
            </div>
          </div> */}
        {/* </div> */}

        {/* Select theme */}

        {/*  */}
        <NotificationPreference />
        <LanguageGeoLocation />
        <PrivacySettings />
      </div>
      <button className=" w-full bg-primary500 py-4 px-6 rounded-lg mt-8 text-white ">
        Save & Continue
      </button>
    </div>
  );
};

export default CustomizationSetting;
