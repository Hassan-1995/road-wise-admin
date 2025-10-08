// import { Vehicle } from "@prisma/client";
// import VehicleRegisteredTable from "./components/VehicleRegisteredTable";

// const VehiclesPage = async () => {
//   let vehicles: Vehicle[] = [];

//   try {
//     // vehicles = await prisma.vehicle.findMany();
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicle`, {
//       cache: "no-store", // Ensures fresh data every request
//     });
//     vehicles = await res.json();
//   } catch (error) {
//     console.error("Error fetching vehicles:", error);
//     // You could also return an error component or message here
//   }

//   const formattedVehicles = vehicles.map((v) => ({
//     id: v.id,
//     vehicleId: v.vehicleId,
//     makeModel: v.makeModel,
//     registrationNumber: v.registrationNumber,
//     status: v.status.replace(/_/g, " "), // "In_Transit" -> "In Transit"
//     currentLocation: v.currentLocation ?? "—",
//   }));

//   return (
//     <div className="p-4">
//       <h1 className="text-lg font-bold mb-4">Vehilces</h1>
//       <div className="flex gap-4 overflow-x-auto py-2 mb-3">
//         <VehicleRegisteredTable />
//       </div>
//     </div>
//   );
// };

// export default VehiclesPage;

import Link from "next/link";
import Vehicles from "./components/Vehicles";

const VehiclesPage = async () => {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-bold mb-4">Vehicles</h1>
        <Link
          href={"/vehicles/add-vehicle"}
          className="text-blue-900 font-semibold rounded-xl hover:underline underline-offset-[5px] mr-10"
        >
          {" "}
          Add Vehicle
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <Vehicles />
      </div>
    </div>
  );
};

export default VehiclesPage;
