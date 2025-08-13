import WrapperLiveMapPosition from "../components/WrapperLiveMapPosition";
import LiveVehicleInfo from "./component/LiveVehicleInfo";

const LivePositions = async () => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Live Tracker</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        {/* <div className="relative w-full h-[calc(100vh-120px)] rounded-xl shadow overflow-hidden"> */}
        {/* <div className="relative w-full aspect-video rounded-xl shadow overflow-hidden"> */}
        <div className="relative w-full aspect-video overflow-hidden">
          <WrapperLiveMapPosition />
        </div>
        <div className="relative w-full h-auto rounded-xl shadow overflow-hidden">
          <LiveVehicleInfo />
        </div>
      </div>
    </div>
  );
};

export default LivePositions;
