"use client";

import { useEffect, useState } from "react";
import { getAllVehiclesInfo, Vehicle } from "@/app/apiFolder/vehicle";
import { FaWrench } from "react-icons/fa";
import { FiCheckCircle, FiPauseCircle, FiTruck } from "react-icons/fi";

const VehicleRegisteredTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehiclesInfo();
        setVehicles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

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

  if (loading) return <p className="p-4 text-gray-600">Loading vehicles...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/5 p-3">Vehicle ID</div>
        <div className="w-1/5 p-3">Make/Model</div>
        <div className="w-1/5 p-3">Registration</div>
        <div className="w-1/5 p-3">Status</div>
        <div className="w-1/5 p-3">Location</div>
      </div>

      {/* Table Rows */}
      {vehicles.map((v) => (
        <div
          key={v.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Vehicle ID: </span>
            {v.vehicleId}
          </div>
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Make/Model: </span>
            {v.makeModel}
          </div>
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Registration: </span>
            {v.registrationNumber}
          </div>
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700 items-center gap-2">
            <span className="lg:hidden font-medium">Status: </span>
            {getStatusIcon(v.status.replace(/_/g, " "))}
          </div>
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Location: </span>
            {v.currentLocation ?? "—"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleRegisteredTable;
