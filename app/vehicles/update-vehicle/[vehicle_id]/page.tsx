import { getVehicleByID } from "@/app/apiFolder/vehicle";
import React from "react";
import UpdateVehicleForm from "./UpdateVehicleForm";
// import UpdateVehicleForm from "./UpdateVehicleForm";

type Props = {
  params: Promise<{ vehicle_id: string }>;
};

const UpdateVehiclePage = async ({ params }: Props) => {
  const { vehicle_id } = await params; // ✅ unwrap params
  const vehicle = await getVehicleByID(Number(vehicle_id));

  console.log("Vehicle:", vehicle);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-12 pt-4 px-4">
      <div className="max-w-2xl">
        <h1 className="text-lg font-bold mb-4">Update Vehicle</h1>
        {vehicle ? (
          <UpdateVehicleForm vehicle={vehicle} />
        ) : (
          <p className="text-red-500">Vehicle not found.</p>
        )}
      </div>
    </div>
  );
};

export default UpdateVehiclePage;
