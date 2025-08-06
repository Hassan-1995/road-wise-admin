// "use client";
// import DropDown from "../component/DropDown";
// import AllocateButton from "./AllocateButton";
// import CreateTripButton from "./CreateTripButton";
// import TripMessage from "./TripMessage";
// import WrapperDropoff from "./WrapperDropoff";
// import DetailMessage from "./DetailMessage";
// import { useEffect, useState } from "react";
// import { getAllVehiclesInfo, Vehicle } from "@/app/apiFolder/vehicle";
// import { getAllStoresInfo, Store } from "@/app/apiFolder/store";
// import { Driver, getDriverById } from "@/app/apiFolder/driver";

// type Props = {
//   params: {
//     driverManagementID: string;
//   };
// };

// const DriverTripAllocation = ({ params }: Props) => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [stores, setStores] = useState<Store[]>([]);
//   const [driverInfo, setDriverInfo] = useState<Driver | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchVehicle_Store = async () => {
//       try {
//         const fetchedVehicles = await getAllVehiclesInfo();
//         const fetchedStores = await getAllStoresInfo();
//         const fetchDriver_by_id = await getDriverById(
//           Number(params.driverManagementID)
//         );
//         setVehicles(fetchedVehicles);
//         setStores(fetchedStores);
//         setDriverInfo(fetchDriver_by_id);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching vehicles:", err);
//         setError("Failed to load vehicles data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicle_Store();
//   }, []);

//   const formattedVehicles = vehicles
//     .filter((v) => v.status === "Available")
//     .map((v) => ({
//       id: v.id,
//       value: v.makeModel,
//     }));

//   const formattedStores = stores.map((s) => ({
//     id: s.id,
//     value: s.storeName + " — " + s.address,
//   }));

//   console.log("DRIVER INFO: ", driverInfo);

//   return (
//     <div className="p-4 max-w-full">
//       <section className="max-w-2xl">
//         <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
//           Allocation of Route
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
//             <p className="text-sm text-gray-500">Driver Name</p>
//             <p className="text-base font-semibold text-gray-800">
//               {driverInfo?.name ?? "Unknown Driver"}
//             </p>
//           </div>
//           <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
//             <p className="text-sm text-gray-500">License Number</p>
//             <p className="text-base font-semibold text-gray-800">
//               {driverInfo?.licenseNumber ?? "N/A"}
//             </p>
//           </div>
//           <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
//             <p className="text-sm text-gray-500">CNIC Number</p>
//             <p className="text-base font-semibold text-gray-800">
//               {driverInfo?.cnicNumber ?? "N/A"}
//             </p>
//           </div>
//           <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
//             <p className="text-sm text-gray-500">Residence Area</p>
//             <p className="text-base font-semibold text-gray-800">
//               {driverInfo?.residenceArea ?? "N/A"}
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="w-full flex mb-10 ">
//         <div className="w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           {loading && <p className="p-4 text-gray-600">Loading vehicles...</p>}
//           {error && <p className="p-4 text-red-600">{error}</p>}
//           <DropDown options={formattedVehicles} label="Select Vehicle" />
//           <div className="flex md:justify-end sm:justify-start items-end">
//             <CreateTripButton driverID={driverInfo?.id} />
//           </div>
//         </div>
//         <div className="flex-1 pl-5">
//           <TripMessage />
//         </div>
//       </section>

//       <WrapperDropoff>
//         <section className="w-full flex ">
//           <div className="w-[50%]">
//             <DropDown options={formattedStores} label="Select Dropoff" />
//             {/* <AllocateButton driverInfo={driverInfo} /> */}
//           </div>
//           <div className="flex-1">
//             <DetailMessage driverName={driverInfo?.name} />
//           </div>
//         </section>
//       </WrapperDropoff>
//     </div>
//   );
// };

// export default DriverTripAllocation;

// app/(your-route)/DriverTripAllocation.tsx (or .jsx if using JS)

import DropDown from "../component/DropDown";
import AllocateButton from "./AllocateButton";
import CreateTripButton from "./CreateTripButton";
import TripMessage from "./TripMessage";
import WrapperDropoff from "./WrapperDropoff";
import DetailMessage from "./DetailMessage";

import { getAllVehiclesInfo } from "@/app/apiFolder/vehicle";
import { getAllStoresInfo } from "@/app/apiFolder/store";
import { getDriverById, Driver } from "@/app/apiFolder/driver";

type Props = {
  params: {
    driverManagementID: string;
  };
};

const DriverTripAllocation = async ({ params }: Props) => {
  const driverID = Number(params.driverManagementID);

  try {
    const [vehicles, stores, driverInfo] = await Promise.all([
      getAllVehiclesInfo(),
      getAllStoresInfo(),
      getDriverById(driverID),
    ]);

    const formattedVehicles = vehicles
      .filter((v) => v.status === "Available")
      .map((v) => ({
        id: v.id,
        value: v.makeModel,
      }));

    const formattedStores = stores.map((s) => ({
      id: s.id,
      value: `${s.storeName} — ${s.address}`,
    }));

    console.log("Raw Data: ", typeof driverInfo);
    return (
      <div className="p-4 max-w-full">
        <section className="max-w-2xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            Allocation of Route
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <InfoCard
              label="Driver Name"
              value={driverInfo.name ?? "Unknown Driver"}
            />
            <InfoCard
              label="License Number"
              value={driverInfo?.licenseNumber ?? "N/A"}
            />
            <InfoCard
              label="CNIC Number"
              value={driverInfo.cnicNumber ?? "N/A"}
            />
            <InfoCard
              label="Residence Area"
              value={driverInfo.residenceArea ?? "N/A"}
            />
          </div>
        </section>

        <section className="w-full flex mb-10">
          <div className="w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <DropDown options={formattedVehicles} label="Select Vehicle" />
            <div className="flex md:justify-end sm:justify-start items-end">
              <CreateTripButton driverID={driverInfo?.id} />
            </div>
          </div>
          <div className="flex-1 pl-5">
            <TripMessage />
          </div>
        </section>

        <WrapperDropoff>
          <section className="w-full flex">
            <div className="w-[50%]">
              <DropDown options={formattedStores} label="Select Dropoff" />
              <AllocateButton driverInfo={driverInfo} />
            </div>
            <div className="flex-1">
              <DetailMessage driverName={driverInfo?.name} />
            </div>
          </section>
        </WrapperDropoff>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading trip allocation data.
      </div>
    );
  }
};

export default DriverTripAllocation;

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-semibold text-gray-800">{value}</p>
  </div>
);
