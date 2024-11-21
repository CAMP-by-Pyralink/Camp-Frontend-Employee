import filterIcon from "../../assets/svgs/filtericon.svg";
import AssetsTable from "../../components/AssetsTable";

const Assets = () => {
  return (
    <div>
      <div className="text-[#444444] px-4 py-6">
        <p className="font-medium text-[24px]">Assets Management</p>
        <p>This tables consists of all assets assigned to you</p>
      </div>
      <div className="bg-white rounded-md w-full pb-10 px-[20px]">
        <div className="flex items-center justify-between">
          <div className="px-4 flex items-center gap-3 border-b-[0.5px] border-[#333333] w-[372px]">
            <input type="text" placeholder="Search" className="py-2 w-full" />
          </div>
          <div className="flex gap-2">
            {/* Filter Button */}
            <div className="flex items-center border border-primary500 px-3 py-[2px] rounded shadow-sm cursor-pointer">
              <img src={filterIcon} className="mr-2" alt="Filter Icon" />
              Filter
            </div>

            {/* Export Button */}
            <button className="flex items-center bg-primary500 text-white px-4 py-2 rounded-md shadow-sm">
              {/* <BsDownload className="mr-2" /> */}
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <AssetsTable />
    </div>
  );
};

export default Assets;
