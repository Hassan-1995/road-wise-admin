import React from "react";
import { FaWrench } from "react-icons/fa";
import { FiCheckCircle, FiPauseCircle, FiTruck } from "react-icons/fi";

type VehicleRegisteredTableProps = {
  RegisteredVeicles: {
    id: number;
    vehicleId: string;
    makeModel: string;
    registrationNumber: string;
    status: string;
    currentLocation?: string;
  }[];
};

const VehicleRegisteredTable = ({
  RegisteredVeicles,
}: VehicleRegisteredTableProps) => {
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

      {RegisteredVeicles.map((vehicle) => (
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
            {/* <span
              className={`text-white font-semibold px-2 py-1 rounded-full border ${getStatusBadgeColor(
                vehicle.status
              )}`}
            >
              {vehicle.status}
            </span> */}
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
