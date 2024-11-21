import React, { useState } from "react";
import { Link } from "react-router-dom";
import pass from "../assets/passed.png";
import fail from "../assets/failed.png";

interface Score {
  date: string;
  emailStatus: string;
  time: string;
  browserStatus: string;
  details: string;
  status: string;
}

const PhishingTable: React.FC = () => {
  const users: Score[] = [
    {
      date: "11-08-2024",
      emailStatus: "Phished",
      time: "11:00",
      browserStatus: "Vulnerable",
      details: "Microsoft Edge",
      status: "Failed",
    },
    {
      date: "11-08-2024",
      emailStatus: "Unopened",
      time: "11:00",
      browserStatus: "Unknown",
      details: "Microsoft Edge",
      status: "Passed",
    },
    {
      date: "11-08-2024",
      emailStatus: "Unopened",
      time: "11:00",
      browserStatus: "Unknown",
      details: "Microsoft Edge",
      status: "Passed",
    },
    {
      date: "11-08-2024",
      emailStatus: "Unopened",
      time: "11:00",
      browserStatus: "Unknown",
      details: "Microsoft Edge",
      status: "Passed",
    },
  ];

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleButtonClick = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  return (
    <div className="relative">
      <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#F0F2F5] text-left text-[#344054]">
            <th className="p-4 pl-16 border-b border-gray-200 font-normal">
              DATE
            </th>
            <th className="p-4 border-b border-gray-200 font-normal">
              EMAIL STATUS
            </th>
            <th className="p-4 border-b border-gray- font-normal">TIME</th>
            <th className="p-4 border-b border-gray- font-normal">
              BROWSER STATUS
            </th>
            <th className="p-4 border-b border-gray- font-normal">DETAILS</th>
            <th className="p-4 border-b border-gray- font-normal">STATUS</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user, index) => (
            <tr
              key={index}
              className="text-[#101928] hover:bg-gray-50 relative"
            >
              <td className="p-4 border-b border-gray-200">{user.date}</td>
              <td className="p-4 border-b border-gray-200">
                {user.emailStatus}
              </td>
              <td className="p-4 text-[#737373] text-[14px] border-b border-gray-200">
                {user.time}
              </td>
              <td className={`p-4 border-b border-gray-200 `}>
                <div
                  className={`rounded-[13px] py-[2.13px] px-[13px] w-fit ${
                    user.browserStatus === "Vulnerable"
                      ? " text-[#04326B] bg-[#E3EFFC] "
                      : " bg-[#FFECE5] text-[#AD3307]"
                  }`}
                >
                  {user.browserStatus}
                </div>
              </td>
              <td className="p-4 border-b border-gray-200">{user.details}</td>
              <td className="p-4 border-b border-gray-200">
                <div>
                  <img
                    src={`${user.status === "Passed" ? pass : fail}`}
                    alt=""
                  />
                </div>
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

export default PhishingTable;
