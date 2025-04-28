import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pass from "../assets/passed.png";
import fail from "../assets/failed.png";
import { useAssetsStore } from "../store/useAssetsStore";

interface Score {
  date: string;
  warrantyDate: string;
  location: string;
  browserStatus: string;
  antiStatus: string;
  status: string;
  id: string;
  name: string;
  category: string;
  subRenew: string;
}

const AssetsTable: React.FC = () => {
  const navigate = useNavigate();
  const users: Score[] = [
    {
      warrantyDate: "11-08-2024",
      id: "Py-MF-2131",
      category: "Hardware",
      date: "Apr 12, 2023",
      antiStatus: "Up-to-date",
      location: "Accounting",
      name: "Laptop",
      browserStatus: "Vulnerable",
      status: "Active",
      subRenew: "Monthly",
    },
    {
      warrantyDate: "11-08-2024",
      id: "Py-MF-2131",
      category: "Hardware",
      date: "Apr 12, 2023",
      antiStatus: "Up-to-date",
      location: "Accounting",
      name: "Laptop",
      browserStatus: "Vulnerable",
      status: "Inactive",
      subRenew: "Monthly",
    },
    {
      warrantyDate: "11-08-2024",
      id: "Py-MF-2131",
      category: "Hardware",
      date: "Apr 12, 2023",
      antiStatus: "Overdue",
      location: "Accounting",
      name: "Laptop",
      browserStatus: "Vulnerable",
      status: "Repairs",
      subRenew: "Monthly",
    },
    {
      warrantyDate: "11-08-2024",
      id: "Py-MF-2131",
      category: "Hardware",
      date: "Apr 12, 2023",
      antiStatus: "N/A",
      location: "Accounting",
      name: "Laptop",
      browserStatus: "Vulnerable",
      status: "Reassigned",
      subRenew: "N/A",
    },
  ];

  const { getAllAssets, allAssets, isLoading } = useAssetsStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleButtonClick = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const PageOpen = (id: string) => {
    navigate(`/assets/${id}`);
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  console.log(allAssets, "All Assets");
  return (
    <div className="relative min-h-[500px]">
      <div className="overflow-x-scroll custom-scrollbar w-full top-0 absolute  h-full pb-4">
        <table className="w-full min-w-[1300px] table-fixed border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#F0F2F5] text-left text-[#344054]">
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                ASSET NAME
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                CATEGORY
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                PURCHASE DATE
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                LOCATION
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                STATUS
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                ANTIVIRUS STATUS
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                WARRANTY EXPIRATION
              </th>
              <th className="p-4 border-b text-xs border-gray-200 font-normal">
                SUBSCRIPTION RENEWALS
              </th>
              <th className="p-4 border-b text-center text-xs border-gray-200 font-normal">
                DETAILS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allAssets.map((asset, index) => (
              <tr
                key={index}
                className="text-[#101928] hover:bg-gray-50 relative"
              >
                {/* <td className="p-4 border-b text-[#475367] border-gray-200 text-xs">
                  {asset._id}
                </td> */}
                <td className="p-4 border-b text-[#475367] border-gray-200 text-xs">
                  {asset.assetName}
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  {asset.category}
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  {new Date(asset.purchaseDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  {asset.location}
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  <div
                    className={`rounded-[13px] py-[2.13px] px-[13px] w-fit text-[12px] ${
                      asset.status === "Active"
                        ? " text-[#036B26] bg-[#E7F6EC] "
                        : asset.status === "Inactive"
                        ? "bg-[#FFECE5] text-[#AD3307]"
                        : " bg-[#F0F2F5] text-[#344054]"
                    } `}
                  >
                    {asset.status}
                  </div>
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  <div
                    className={`rounded-[13px] border py-[2px] px-[12px] w-fit text-[12px] ${
                      asset.antivirusStatus === "Up-to-date"
                        ? " text-[#036B26] border-[#036B26] "
                        : asset.antivirusStatus === "N/A"
                        ? "border-[#98A2B3] text-[#98A2B3]"
                        : " border-[#865503] text-[#865503]"
                    } `}
                  >
                    {asset.antivirusStatus}
                  </div>
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  {new Date(asset.warrantyExpiration).toLocaleDateString()}
                </td>
                <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                  {asset.subscriptionRenewal}
                </td>
                <td className="p-4 text-center text-[#475367] text-[12px] border-b border-gray-200">
                  <button
                    className="py-[5px] border border-[#04326B] px-[12px] w-fit text-[#04326B] text-xs"
                    onClick={() => {
                      PageOpen(asset._id);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" absolute bottom-4 w-full left-0 flex justify-between items-center mt-4">
        <span className="text-sm text-[#070707]">Page 1 of 7</span>
        <div className="flex gap-2">
          <button className=" px-[14px] py-2 text-sm text-[#D0D5DD] border rounded-lg border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Prev
          </button>
          <button className=" px-[14px] py-2 text-sm border rounded-lg  border-[#EAECF0] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] bg-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetsTable;
