"use client";
import {
  getDriverLivePosition,
  LiveTracker,
} from "@/app/apiFolder/live-tracker";
import React, { useEffect, useState } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";

const LiveVehicleInfo = () => {
  const [vehicles, setVehicles] = useState<LiveTracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let live_trackers: LiveTracker[] = [];
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        live_trackers = await getDriverLivePosition();
        setVehicles(live_trackers);
        setError(null);
      } catch (error) {
        console.error("Error fetching driver data:", error);
        setError("Failed to load drivers live position.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  console.log("Raw Data: ", vehicles);

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "Active":
        return <MdCheckCircle className="text-green-500 w-5 h-5" />;
      case "Break":
        return <MdCancel className="text-red-500 w-5 h-5" />;
      default:
        return <h1>N/A</h1>;
    }
  };
  const formatTime = (dateString: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    return `${timePart} ${day}-${month}`;
  };

  if (loading) return <p>Loading vehicles info...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/5 p-3">Name</div>
        <div className="w-1/5 p-3">Status</div>
        <div className="w-1/5 p-3">Make & Model</div>
        <div className="w-1/5 p-3">Number Plate</div>
        <div className="w-1/5 p-3">Time Stamp</div>
      </div>

      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          {/* Driver Name */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Driver Name:</span>
            {vehicle.driverName}
          </div>

          {/* Vehicle Status */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Status:</span>
            {getStatusIcon(vehicle.status)}
          </div>

          {/* Vehicle Make and Model */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Make and Model:</span>
            {vehicle.makeModel}
          </div>

          {/* Vehicle Number Plate */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Number Plate:</span>
            {vehicle.registrationNumber}
          </div>

          {/* Vehicle Live Position Recorded Time */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Time Stamp:</span>
            {formatTime(String(vehicle.recordedAt))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveVehicleInfo;
