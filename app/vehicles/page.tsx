import React from "react";
import VehicleRegisteredTable from "./components/VehicleRegisteredTable";
import { prisma } from "@/lib/client";
import { Vehicle } from "@prisma/client";

const VehiclesPage = async () => {
  let vehicles: Vehicle[] = [];

  try {
    vehicles = await prisma.vehicle.findMany();
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    // You could also return an error component or message here
  }

  const formattedVehicles = vehicles.map((v) => ({
    id: v.id,
    vehicleId: v.vehicleId,
    makeModel: v.makeModel,
    registrationNumber: v.registrationNumber,
    status: v.status.replace(/_/g, " "), // "In_Transit" -> "In Transit"
    currentLocation: v.currentLocation ?? "—",
  }));

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Vehilces</h1>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <VehicleRegisteredTable RegisteredVeicles={formattedVehicles} />
      </div>
    </div>
  );
};

export default VehiclesPage;
