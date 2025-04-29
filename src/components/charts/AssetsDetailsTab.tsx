import { useEffect, useState } from "react";
import { useAssetsStore } from "../../store/useAssetsStore";
import GeneralTab from "../Assetss/GeneralTab";
import TechnicalSpecs from "../Assetss/TechnicalSpecs";
import Warranty from "../Assetss/Warranty";
import Parts from "../Assetss/Parts";
import Logs from "../Assetss/Logs";

interface AssetsDetailsTabProps {
  id: string;
}

const AssetsDetailsTab = ({ id }: AssetsDetailsTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const { getAssetById, isLoading, singleAsset } = useAssetsStore();
  useEffect(() => {
    const fetchAsset = async () => {
      await getAssetById(id);
    };
    fetchAsset();
  }, [getAssetById, id]);

  const steps = [
    "General",
    "Technical Specifications",
    "Warranty",
    "Parts/Boms",
    "Log",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <GeneralTab singleAsset={singleAsset} />;
      case 1:
        return <TechnicalSpecs singleAsset={singleAsset} />;
      case 2:
        return <Warranty singleAsset={singleAsset} />;
      case 3:
        return <Parts />;
      case 4:
        return <Logs singleAsset={singleAsset} />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-white py-10 font-poppins">
      {/* Stepper Tabs */}
      <div className="flex w-fit whitespace-nowrap rounded-lg overflow-hidden bg-white border border-[#E4E7EC] mb-6">
        {steps.map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === idx
                ? "bg-[#F0F2F5] text-[#344054] font-semibold shadow-sm"
                : "bg-white text-[#475367] hover:bg-gray-50 font-medium"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default AssetsDetailsTab;
