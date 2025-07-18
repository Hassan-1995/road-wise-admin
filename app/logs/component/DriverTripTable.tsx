import React from "react";
import Link from "next/link";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

type DriverTripRow = {
  id: number;
  name: string; // Driver's name
  vehicle: string; // Vehicle makeModel
  numberPlate: string; // Vehicle registrationNumber
  store: string; // Store name
  begin: Date | null; // startTime
  finish: Date | null; // endTime
  distance: string | null; // distanceKm as string or null
  status: "In_Progress" | "Completed" | "Cancelled"; // TripStatus
  notes: string | null; // Notes
};

type DriverTripTableProps = {
  trips: DriverTripRow[];
};

const DriverTripTable = ({ trips }: DriverTripTableProps) => {
  const getTripStatusIcon = (
    status: "In_Progress" | "Completed" | "Cancelled"
  ) => {
    switch (status) {
      case "In_Progress":
        return <FiClock className="text-blue-800 w-5 h-5" />;
      case "Completed":
        return <FiCheckCircle className="text-green-500 w-5 h-5" />;
      case "Cancelled":
        return <FiXCircle className="text-red-500 w-5 h-5" />;
      default:
        return null;
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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/12 p-3">Vehicle</div>
        <div className="w-1/12 p-3">Reg #</div>
        <div className="w-2/12 p-3">Store</div>
        <div className="w-2/12 p-3">Start Time</div>
        <div className="w-2/12 p-3">End Time</div>
        <div className="w-1/12 p-3">Dist (km)</div>
        <div className="w-1/12 p-3">Status</div>
        <div className="w-2/12 p-3">Notes</div>
      </div>

      {trips.map((trip) => (
        <Link
          key={trip.id}
          href={`/path-comparison/${trip.id}`}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex lg:block justify-between lg:w-1/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Vehicle: </span>
            {trip.vehicle}
          </div>
          <div className="flex lg:block justify-between lg:w-1/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Reg #: </span>
            {trip.numberPlate ?? "N/A"}
          </div>
          <div className="whitespace-pre-wrap flex lg:block justify-between lg:w-2/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Store: </span>
            {trip.store ?? "N/A"}
          </div>
          <div className="flex lg:block justify-between lg:w-2/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Start Time: </span>
            {/* {trip.begin ? new Date(trip.begin).toLocaleString() : "N/A"} */}
            {trip.begin ? formatTime(String(trip.begin)) : "N/A"}
          </div>
          <div className="flex lg:block justify-between lg:w-2/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">End Time: </span>
            {/* {trip.finish ? new Date(trip.finish).toLocaleString() : "N/A"} */}
            {trip.finish ? formatTime(String(trip.finish)) : "N/A"}
          </div>
          <div className="flex lg:block justify-between lg:w-1/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Distance: </span>
            {trip.distance ?? "N/A"}
          </div>
          <div className="flex lg:block justify-between lg:w-1/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Status: </span>
            {/* {trip.status.replace("_", " ")} */}
            {getTripStatusIcon(trip.status)}
          </div>
          <div className="flex lg:block justify-between lg:w-2/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Notes: </span>
            {trip.notes ?? "N/A"}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DriverTripTable;
