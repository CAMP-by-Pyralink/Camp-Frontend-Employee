import { useNavigate } from "react-router-dom";

interface props {
  text: string;
  time: string;
}

const Notification = ({ text, time }: props) => {
  const navigate = useNavigate();

  const notify = () => {
    navigate("/notification");
  };
  return (
    <div className="absolute shadow-[5px_5px_40px_rgba(107,151,255,0.3)] bg-white rounded-md w-[336px] top-[40px] right-[4px] z-10">
      <p className="text-[20px] font-medium text-center text-[#333333] py-[10px]">
        Notification
      </p>
      <div className="flex flex-col">
        <div className="border-y-2 p-[10px]">
          <p className="text-sm text-[#333333] mt-2 w-full">{text}</p>
          <p className="text-sm text-right px-[10px] pt-[10px]">{time}</p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center pt-[20px] pb-[40px]">
        <button
          className="border border-[#282EFF] rounded px-3 font-medium text-[#433E3F] py-[10px]"
          onClick={notify}
        >
          View all notification
        </button>
      </div>
    </div>
  );
};

export default Notification;
