interface Asset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  location: string;
  status: string;
  assignedTo: string;
}

const assetsData: Asset[] = [
  {
    id: "Py-MF-2131",
    name: "Photoshop",
    category: "Software",
    location: "Acounting",
    status: "Active",
    purchaseDate: "22-09-2024 11:59PM",
    assignedTo: "Design team",
  },
  {
    id: "Py-MF-2131",
    name: "Laptop",
    category: "Hardware",
    location: "Acounting",
    status: "Inctive",
    purchaseDate: "22-09-2024 11:59PM",
    assignedTo: "Olamide",
  },
  {
    id: "Py-MF-2131",
    name: "Laptop",
    category: "Hardware",
    location: "Acounting",
    status: "Inactive",
    purchaseDate: "22-09-2024 11:59PM",
    assignedTo: "HR",
  },
  {
    id: "Py-MF-2131",
    name: "Laptop",
    category: "Hardware",
    location: "Acounting",
    status: "Active",
    purchaseDate: "22-09-2024 11:59PM",
    assignedTo: "HR",
  },
  {
    id: "Py-MF-2131",
    name: "Laptop",
    category: "Hardware",
    location: "Acounting",
    status: "Active",
    purchaseDate: "22-09-2024 11:59PM",
    assignedTo: "HR",
  },
];

const AssetsTable: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-[5px_5px_40px_rgba(107,151,255,0.3)] w-full">
      <div className="flex justify-between items-center">
        <h2 className=" ">Assets</h2>
        <a
          href="/view-all"
          className=" text-xs text-primary500 hover:underline"
        >
          View all &gt;
        </a>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className=" text-left text-[10px] text-[#454545] font-bold">
              <th className="px-[20px] py-[11px] ">ASSET ID</th>
              <th className="px-[20px] py-[11px] ">ASSET NAME</th>
              <th className="px-[20px] py-[11px] ">CATEGORY</th>
              <th className="px-[20px] py-[11px] ">LOCATION</th>
              <th className="px-[20px] py-[11px] ">STATUS</th>
              <th className="px-[20px] py-[11px] ">DATE ADDED</th>
              <th className="px-[40px] py-[11px] ">DETAILS</th>
            </tr>
          </thead>
          <tbody className="text-[#404040] text-[10px] font-medium">
            {assetsData.map((asset, index) => (
              <tr key={index} className=" border-t-[0.5px] border-[#E8E8E8]">
                <td className="px-[20px] py-6 text-[#404040]">{asset.id}</td>
                <td className="px-[20px] py-2 text-[#404040]">{asset.name}</td>
                <td className="px-[20px] py-2">{asset.category}</td>
                <td className="px-[20px] py-2">{asset.location}</td>
                <td className="px-[20px] py-2">
                  <div
                    className={`rounded-[13px] py-[2.13px] px-[13px] w-fit text-[11px] ${
                      asset.status === "Active"
                        ? " text-[#0B7B69] bg-[#A4F4E7] "
                        : " bg-[#FFECE5] text-[#AD3307]"
                    } `}
                  >
                    {asset.status}
                  </div>
                </td>
                <td className="px-[20px] py-2">{asset.purchaseDate}</td>
                <td className="px-8 py-2">
                  <button className="py-[5px] border border-[#0006D1] px-[10px] w-fit text-[#04326B]">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsTable;
