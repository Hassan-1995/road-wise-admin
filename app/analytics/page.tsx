import { Driver, FuelLog, User, Vehicle } from "@prisma/client";
import FuelLogTable from "./component/FuelLogTable";

type FuelMetrics = FuelLog & {
  driver: Pick<Driver, "userId"> & {
    user: Pick<User, "name">;
  };
  vehicle: Pick<Vehicle, "makeModel" | "registrationNumber">;
};

const AnalyticsPage = async () => {
  let fuelMetrics: FuelMetrics[] = [];

  console.log(fuelMetrics);

  const formattedFuelLogTable = fuelMetrics.map((f) => ({
    id: f.id,
    refuelingTime: f.refuelDate,
    makeModel: f.vehicle.makeModel,
    meterReading: Number(f.odometerKm),
    liters: Number(f.liters),
    name: f.driver.user.name,
    cost: Number(f.costRs),
  }));

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Fuel & Cost Analytics</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        <FuelLogTable fuelInfo={formattedFuelLogTable} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
