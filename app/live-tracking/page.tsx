import { Driver, LiveTracker, User, Vehicle } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import WrapperLiveMapPosition from "../components/WrapperLiveMapPosition";
import LiveVehicleInfo from "./component/LiveVehicleInfo";

type LivePositions = LiveTracker & {
  driver: Pick<Driver, "userId"> & {
    user: Pick<User, "name">;
  };
  vehicle: Pick<Vehicle, "makeModel" | "registrationNumber">;
};

const LivePositions = async () => {
  let live_trackers: LivePositions[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/live-tracker", {
      cache: "no-store", // Ensures fresh data every request
    });
    live_trackers = await res.json();
  } catch (error) {
    console.error("Error fetching live positions:", error);
  }
  console.log("Raw: ", live_trackers);

  const formattedPositions = live_trackers.map((l) => ({
    id: l.id,
    name: l.driver.user.name,
    position: [
      parseFloat(l.latitude as unknown as string),
      parseFloat(l.longitude as unknown as string),
    ] as LatLngExpression,
  }));
  console.log("Refine: ", formattedPositions);

  const formattedInformation = live_trackers.map((l) => ({
    id: l.id,
    name: l.driver.user.name,
    status: l.status,
    makeModel: l.vehicle.makeModel,
    numberPlate: l.vehicle.registrationNumber,
    recordedTime: l.recordedAt,
  }));

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Live Tracker</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        {/* <div className="relative w-full h-[calc(100vh-120px)] rounded-xl shadow overflow-hidden"> */}
        <div className="relative w-full aspect-video rounded-xl shadow overflow-hidden">
          <WrapperLiveMapPosition locations={formattedPositions} />
        </div>
        <div className="relative w-full h-auto rounded-xl shadow overflow-hidden">
          <LiveVehicleInfo vehicleInfo={formattedInformation} />
        </div>
      </div>
    </div>
  );
};

export default LivePositions;
