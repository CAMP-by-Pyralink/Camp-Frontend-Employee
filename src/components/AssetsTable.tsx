import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pass from "../assets/passed.png";
import fail from "../assets/failed.png";

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

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleButtonClick = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const PageOpen = (id: string) => {
    navigate(`/assets/${id}`);
  };

  return (
    <div className="relative">
      <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#F0F2F5] text-left text-[#344054]">
            <th className="p-4 border-b text-center text-xs border-gray-200 font-normal">
              ASSET ID
            </th>
            <th className="p-4 border-b text-xs border-gray-200 font-normal">
              ASSET NAME
            </th>
            <th className="p-4 border-b text-xs border-gray-200 font-normal">
              CATEGORY
            </th>
            <th className="p-4 border-b text-xs border-gray-200 font-normal flex flex-col">
              PURCHASE <span>DATE</span>
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
            <th className="p-4 border-b text-xs border-gray-200 font-normal flex flex-col">
              SUBSCRIPTION <span>RENEWALS</span>
            </th>
            <th className="p-4 border-b text-center text-xs border-gray-200 font-normal">
              DETAILS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user, index) => (
            <tr
              key={index}
              className="text-[#101928] hover:bg-gray-50 relative"
            >
              <td className="p-4 border-b text-[#475367] border-gray-200">
                <div className="flex items-center gap-3 text-xs">
                  <div className="p-2 border-b border-gray-200">
                    <input type="checkbox" />
                  </div>
                  {user.id}
                </div>
              </td>
              <td className="p-4 border-b text-[#475367] border-gray-200 text-xs">
                {user.name}
              </td>
              <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                {user.category}
              </td>
              <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                {user.date}
              </td>
              <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                {user.location}
              </td>
              <td className="px-[20px] py-2">
                <div
                  className={`rounded-[13px] py-[2.13px] px-[13px] w-fit text-[12px] ${
                    user.status === "Active"
                      ? " text-[#036B26] bg-[#E7F6EC] "
                      : user.status === "Inactive"
                      ? "bg-[#FFECE5] text-[#AD3307]"
                      : " bg-[#F0F2F5] text-[#344054]"
                  } `}
                >
                  {user.status}
                </div>
              </td>
              <td className="px-[20px] py-2">
                <div
                  className={`rounded-[13px] border py-[2px] px-[12px] w-fit text-[12px] ${
                    user.antiStatus === "Up-to-date"
                      ? " text-[#036B26] border-[#036B26] "
                      : user.antiStatus === "N/A"
                      ? "border-[#98A2B3] text-[#98A2B3]"
                      : " border-[#865503] text-[#865503]"
                  } `}
                >
                  {user.antiStatus}
                </div>
              </td>
              <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                {user.warrantyDate}
              </td>
              <td className="p-4 text-[#475367] text-[12px] border-b border-gray-200">
                {user.subRenew}
              </td>
              <td className="px-8 py-2">
                <button
                  className="py-[5px] border border-[#04326B] px-[12px] w-fit text-[#04326B] text-xs"
                  onClick={() => {
                    PageOpen(user.id);
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
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
