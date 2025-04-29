interface GeneralTabProps {
  singleAsset: any;
}

const GeneralTab = ({ singleAsset }: GeneralTabProps) => {
  return (
    <div id="general">
      {/* general info */}
      <div className="bg-[#DEEFFC33] p-[10px]">
        <h1 className="text-sm font-medium text-[#333333]">
          General information and location of an Asset:
        </h1>
      </div>

      <div className="w-full py-5 flex flex-col gap-6">
        <div className="w-full grid grid-cols-2">
          <p className="text-sm font-medium text-[#333333]">
            This asset is part of:
          </p>
          <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
            {singleAsset?.department} department
          </p>
        </div>

        <div className="w-full grid grid-cols-2">
          <p className="text-sm font-medium text-[#333333]">
            This asset is located at:
          </p>
          <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
            {singleAsset?.location}
          </p>
        </div>

        <div className="w-full grid grid-cols-2">
          <p className="text-sm font-medium text-[#333333]">
            Current location:
          </p>
          <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
            {singleAsset?.currentLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
