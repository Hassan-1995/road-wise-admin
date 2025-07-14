import { Driver, Store, User, Vehicle } from "@prisma/client";
import DropDown from "../component/DropDown";

type DriverTripAllocationProps = {
  params: { driverManagementID: string };
};

type DriverInfo = Driver & {
  user: Pick<User, "name">;
};

const DriverTripAllocation = async ({ params }: DriverTripAllocationProps) => {
  let vehicles: Vehicle[] = [];
  let stores: Store[] = [];
  let driverInfo: DriverInfo | null = null;
  const id = params.driverManagementID;

  try {
    const res_vehicle = await fetch("http://localhost:3000/api/vehicle", {
      cache: "no-store",
    });
    const res_store = await fetch("http://localhost:3000/api/store", {
      cache: "no-store",
    });
    const res_driverInfo = await fetch(
      `http://localhost:3000/api/driver/${id}`,
      {
        cache: "no-store",
      }
    );
    vehicles = await res_vehicle.json();
    stores = await res_store.json();
    driverInfo = await res_driverInfo.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const formattedVehicles = vehicles
    .filter((v) => v.status === "Available")
    .map((v) => ({
      id: v.id,
      value: v.makeModel,
    }));

  const formattedStores = stores.map((s) => ({
    id: s.id,
    value: s.storeName + " — " + s.address,
  }));

  console.log("DRIVER INFO: ", driverInfo);

  return (
    <div className="p-4 max-w-2xl ">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        Allocation of Route
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Driver Name</p>
          <p className="text-base font-semibold text-gray-800">
            {driverInfo?.user.name ?? "Unknown Driver"}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">License Number</p>
          <p className="text-base font-semibold text-gray-800">
            {driverInfo?.licenseNumber ?? "N/A"}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">CNIC Number</p>
          <p className="text-base font-semibold text-gray-800">
            {driverInfo?.cnicNumber ?? "N/A"}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Residence Area</p>
          <p className="text-base font-semibold text-gray-800">
            {driverInfo?.residenceArea ?? "N/A"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <DropDown options={formattedVehicles} label="Select Vehicle" />
      </div>
      <div>
        <DropDown options={formattedStores} label="Select Dropoff" />
      </div>
    </div>
  );
};

export default DriverTripAllocation;
