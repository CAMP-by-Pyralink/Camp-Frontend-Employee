import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../assets/lap.png";
import code from "../../assets/code.png";
import AssetsDetailsTab from "../../components/charts/AssetsDetailsTab";
import { useAssetsStore } from "../../store/useAssetsStore";
import Loader from "../../shared/Loader";

const AssetsDetails = () => {
  const handleScrollTo = (section: string) => {
    // Scroll to the specified section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const id = window.location.pathname.split("/").slice(-1)[0];
  console.log(id, "id");
  const { isLoading, singleAsset } = useAssetsStore();
  if (!singleAsset) return <Loader />;
  return (
    <div className="font-poppins">
      <div className="flex items-center gap-4 font-poppins">
        <Link to={"/"} className="text-sm font-medium text-[#282EFF]">
          Dashboard
        </Link>
        <p>/</p>
        <Link to={"/assets"} className="text-sm font-medium text-[#282EFF]">
          Assets
        </Link>
        <p>/</p>
        <p className="text-sm font-medium text-[#898384]">Assets Details</p>
      </div>
      <div className="shadow-[5px_5px_40px_rgba(107,151,255,0.3)] w-full p-[20px] bg-white">
        <h1 className="text-[#333333] font-medium text-[24px]">
          {singleAsset?.assetName}
        </h1>
        <div className="py-[21px] px-[43px] bg-[#EBECFF] rounded-md ">
          <div className="bg-white flex items-center justify-between px-[30px] py-5 w-full">
            {/* laptop */}
            <div>
              <div>
                <img
                  src={singleAsset.assetImage || ""}
                  alt=""
                  className="w-[200px] h-[200px] object-cover"
                />
              </div>
            </div>

            {/* text */}
            <h1 className="text-[#333333] font-medium text-[24px]">
              {singleAsset?.assetName}
            </h1>
            {/* barcode */}
            <div className="flex flex-col items-center gap-4">
              <div>
                <img src={code} alt="" />
              </div>
              <h1>{singleAsset.barCode}</h1>
            </div>
          </div>
          {/* <button
            className="text-white bg-[#282EFF] rounded px-3 py-[10px] text-sm font-medium mt-5"
            onClick={() => handleScrollTo("specification")}
          >
            View Specifications
          </button> */}
        </div>
        {/* tabs */}
        <div className="">
          <AssetsDetailsTab id={id} />
        </div>
      </div>
    </div>
  );
};

export default AssetsDetails;
