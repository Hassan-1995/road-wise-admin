import { getDriverById } from "@/app/apiFolder/driver";
import React from "react";
import UpdateDriverForm from "./UpdateDriverForm";

type Props = {
  params: Promise<{ driver_id: string }>;
};

const UpdateDriverPage = async ({ params }: Props) => {
  const { driver_id } = await params; // ✅ unwrap params
  const driver = await getDriverById(Number(driver_id));

  console.log("Driver:", driver);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-12 pt-4 px-4">
      <div className="max-w-2xl">
        <h1 className="text-lg font-bold mb-4">Update Driver</h1>
        {driver ? (
          <UpdateDriverForm driver={driver} />
        ) : (
          <p className="text-red-500">Driver not found.</p>
        )}
      </div>
    </div>
  );
};

export default UpdateDriverPage;
