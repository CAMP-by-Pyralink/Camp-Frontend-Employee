import { useState } from "react";
import info from "../../assets/info1.png";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import CardTooltip from "../../utils/CardTooltip";

const AwarenessTraining = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("Awareness Training");

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectContent = (content: string) => {
    setSelectedContent(content);
    setIsOpen(false);
  };

  const pieData =
    selectedContent === "Awareness Training"
      ? [
          { name: "Completed", value: 7 },
          { name: "Pending", value: 5 },
          { name: "Not Started", value: 2 },
        ]
      : [
          { name: "Software", value: 200 },
          { name: "Hardware", value: 3000 },
        ];

  // Define custom colors for the pie slices
  const COLORS = ["#7E81FF", "#282EFF", "#D4D5FF"];

  const [showTooltip, setShowTooltip] = useState(false);
  const header = "Awareness Training:";
  const text =
    "This displays the progress of your assigned security awareness trainings, helping you track which trainings are completed and which are still pending.";

  return (
    <div className="w-[50%] shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-6 rounded-lg relative">
      <div className="relative">
        <div className="relative w-full rounded-lg flex justify-between items-center gap-4 cursor-pointer">
          <div className="">
            <h1 className="text-baseBlack leading-[16.8px] font-medium">
              {selectedContent}
            </h1>
            <div className="font-medium">
              {pieData.reduce((acc, current) => acc + current.value, 0)}
            </div>
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
      {/* Pie Chart */}
      <div className="flex flex-col items-center relative mt-7">
        <PieChart width={219} height={219}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%" // Center X
            cy="50%" // Center Y
            outerRadius={100}
            innerRadius={60} // This makes it a donut
            fill="#8884d8"
            label={false} // Disable default labels
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* Tooltip for hover information */}
          <Tooltip />
        </PieChart>
      </div>

      {/* Render the details manually below the Pie Chart with color indicators */}
      <div className="">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mt-3">
            {/* Color indicator rectangle */}
            <div
              className="w-[6.5px] aspect-square rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            {/* Label and value */}
            <div className="w-full flex items-center text-sm justify-between">
              <p>{item.name}</p>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwarenessTraining;
