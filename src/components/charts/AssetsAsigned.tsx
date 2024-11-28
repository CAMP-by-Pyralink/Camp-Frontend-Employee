import infoIcon from "../../assets/svgs/info.svg";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const AssetsAsigned = () => {
  const pieData = [
    { name: "Up-to-date device", value: 54 },
    { name: "Update needed", value: 16 },
    { name: "Overdue", value: 30 },
  ];

  // Define custom colors for the pie slices
  const COLORS = ["#5F22C1", "#1790E7", "#7E81FF"];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        fontWeight="500"
      >
        {`${pieData[index].value}%`}
      </text>
    );
  };

  return (
    <div className="w-[50%] shadow-[5px_5px_40px_rgba(107,151,255,0.3)] p-6 rounded-lg relative">
      <div className="relative">
        <div className="relative w-full rounded-lg flex justify-between items-center gap-4 cursor-pointer">
          <div className="">
            <h1 className="text-baseBlack leading-[16.8px] font-medium">
              Assets Assigned
            </h1>
            <div className="font-medium">
              {pieData.reduce((acc, current) => acc + current.value, 0)}
            </div>
          </div>

          <img src={infoIcon} alt="Dropdown arrow" />
        </div>
      </div>
      <hr className="w-full bg-black absolute left-0 top-[5rem]" />
      {/* Pie Chart */}
      <div className="pt-10">
        <div className="flex flex-col items-center relative mt-8">
          <PieChart width={204.85} height={204.85}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%" // Center X
              cy="50%" // Center Y
              outerRadius={100}
              // innerRadius={45} // for donut style
              fill="#8884d8"
              label={renderCustomLabel} // Custom label rendering function
              labelLine={false}
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

          <div className="w-full pt-10">
            {pieData.map((item, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between gap-2 mt-3"
              >
                <div className="flex items-center gap-2">
                  {/* Color indicator rectangle */}
                  <div
                    className=" w-[7px] aspect-square rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <p className={`text-sm`}>{item.name}</p>
                </div>

                {/* Label and value */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary1000 py-[1.88px] px-[3.29px] rounded-[3.17px]">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsAsigned;
