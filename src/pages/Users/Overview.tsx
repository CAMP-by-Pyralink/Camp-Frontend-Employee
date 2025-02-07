import AssetsAsigned from "../../components/charts/AssetsAsigned";
import AssetsTable from "../../components/charts/AssetsTable";
import AwarenessTraining from "../../components/charts/AwarenessTraining";
import PhishingScores from "../../components/charts/PhishingScores";

const Overview = () => {
  return (
    <div className="font-poppins">
      <div className=" mb-8">
        <h3 className=" text-greyText text-sm">Welcome back, Flutter!</h3>
      </div>

      <div className=" flex gap-4 mt-4 w-full">
        <AssetsAsigned />
        <AwarenessTraining />
        <PhishingScores />
      </div>

      <div className="mt-10">
        <AssetsTable />
      </div>
    </div>
  );
};

export default Overview;
