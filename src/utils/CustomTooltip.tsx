import React from "react";
import { TooltipProps } from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p
          className="label"
          style={{ fontWeight: "bold" }}
        >{`Date: ${label}`}</p>
        <p className="intro">{`UV Score: ${payload[0].value}`}</p>
        <p className="desc">Your custom description here</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
