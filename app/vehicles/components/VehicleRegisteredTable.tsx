"use client";
import { getAllVehiclesInfo, Vehicle } from "@/app/apiFolder/vehicle";
import React, { useEffect, useState } from "react";
import { FaWrench } from "react-icons/fa";
import { FiCheckCircle, FiPauseCircle, FiTruck } from "react-icons/fi";

const VehicleRegisteredTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let registered_vehicles: Vehicle[] = [];
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        registered_vehicles = await getAllVehiclesInfo();
        setVehicles(registered_vehicles);
        setError(null);
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
        setError("Failed to load vehicles data.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const formattedVehicles = vehicles.map((v) => ({
    id: v.id,
    vehicleId: v.vehicleId,
    makeModel: v.makeModel,
    registrationNumber: v.registrationNumber,
    status: v.status.replace(/_/g, " "), // "In_Transit" -> "In Transit"
    currentLocation: v.currentLocation ?? "—",
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available":
        return <FiCheckCircle className="text-green-500 w-5 h-5" />;
      case "In Transit":
        return <FiTruck className="text-blue-500 w-5 h-5" />;
      case "Under Maintenance":
        return <FaWrench className="text-yellow-500 w-5 h-5" />;
      case "Idle":
        return <FiPauseCircle className="text-red-400 w-5 h-5" />;
      default:
        return <FiPauseCircle className="text-pink-500 w-5 h-5" />;
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/5 p-3">Vehicle ID</div>
        <div className="w-1/5 p-3">Make/Model</div>
        <div className="w-1/5 p-3">Registration</div>
        <div className="w-1/5 p-3">Status</div>
        <div className="w-1/5 p-3">Location</div>
      </div>

      {formattedVehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          {/* Vehicle ID */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Vehicle ID: </span>
            {vehicle.vehicleId}
          </div>

          {/* Make/Model */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Make/Model: </span>
            {vehicle.makeModel}
          </div>

          {/* Registration Number */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Registration: </span>
            {vehicle.registrationNumber}
          </div>

          {/* Status */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Status: </span>
            <span className={""}>{getStatusIcon(vehicle.status)}</span>
          </div>

          {/* Current Location */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Location: </span>
            {vehicle.currentLocation || "—"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleRegisteredTable;
