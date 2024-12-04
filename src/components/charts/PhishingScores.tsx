import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import info from "../../assets/info1.png";
import CustomTooltip from "../../utils/CustomTooltip";
import { useState } from "react";
import CardTooltip from "../../utils/CardTooltip";

const data = [
  {
    name: "12/1",
    uv: 50,
    pv: 24,
    amt: 50,
  },
  {
    name: "05/2",
    uv: 70,
    pv: 20,
    amt: 70,
  },
  {
    name: "24/3",
    uv: 100,
    pv: 98,
    amt: 100,
  },
  {
    name: "11/4",
    uv: 60,
    pv: 40,
    amt: 60,
  },
  {
    name: "17/5",
    uv: 40,
    pv: 50,
    amt: 40,
  },
  {
    name: "28/6",
    uv: 60,
    pv: 48,
    amt: 60,
  },
  {
    name: "14/7",
    uv: 20,
    pv: 38,
    amt: 20,
  },
  {
    name: "18/8",
    uv: 70,
    pv: 45,
    amt: 70,
  },
  {
    name: "9/9",
    uv: 90,
    pv: 43,
    amt: 90,
  },
];

const PhishingScores = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const header = "Phishing:";
  const text =
    "A cyber attack where malicious emails or messages try to trick you into providing sensitive information like passwords or clicking harmful links.";

  return (
    <div className="w-full shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-6 rounded-lg relative">
      <div className="relative">
        <div className="relative w-full rounded-lg flex justify-between items-center gap-4 cursor-pointer">
          <div className="">
            <h1 className="text-baseBlack  font-medium">Phishing Scores</h1>
          </div>
          <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img src={info} alt="Info arrow" />
            {showTooltip && <CardTooltip header={header} text={text} />}
          </div>
        </div>
      </div>
      <hr className="w-full bg-black absolute left-0 top-[5rem]" />
      <div
        className="flex flex-col items-center relative mt-14"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#5F22C1"
              fill="#DFD3F3"
              strokeWidth={6}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PhishingScores;
