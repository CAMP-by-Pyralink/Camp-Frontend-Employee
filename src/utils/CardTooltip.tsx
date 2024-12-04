const CardTooltip = ({ text, header }: { text: string; header: string }) => {
  return (
    <div className="absolute shadow-[5px_5px_40px_rgba(107,151,255,0.3)] bg-white rounded-md p-4 w-[330px] top-[40px] right-[4px] z-10">
      <p className="text-sm font-semibold text-[#333333]">{header}</p>
      <p className="text-xs text-[#726C6C] mt-2 w-full">{text}</p>
    </div>
  );
};

export default CardTooltip;
