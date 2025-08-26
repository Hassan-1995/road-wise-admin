import React from "react";
import { getDriverById } from "@/app/apiFolder/driver";
import DriverDetailForm from "./DriverDetailForm";

type Props = {
  params: Promise<{ driverID: string }>;
};

const DriverDetail = async ({ params }: Props) => {
  const { driverID } = await params; // ✅ unwrap params
  const driver = await getDriverById(Number(driverID));

  return (
    <div className="min-h-screen bg-gradient-subtle pb-12 pt-4 px-4">
      <div className="max-w-2xl">
        <h1 className="text-lg font-bold mb-4">Driver Registration</h1>
        <DriverDetailForm driver={driver} driver_id={driverID} />
      </div>
    </div>
  );
};

export default DriverDetail;
