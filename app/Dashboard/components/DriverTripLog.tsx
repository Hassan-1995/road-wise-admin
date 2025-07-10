import React from "react";

type DriverTripLogProps = {
  driverTripLog: {
    id: number;
    time: string;
    type: string;
    vehicleId: string;
    driver: string;
    details: string;
  }[];
};

const DriverTripLog = ({ driverTripLog }: DriverTripLogProps) => {
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
        <div className="w-1/6 p-3">Time</div>
        <div className="w-1/6 p-3">Driver</div>
        <div className="w-1/6 p-3">Vehicle</div>
        <div className="w-1/8 p-3">Status</div>
        <div className="w-2/6 p-3">Details</div>
      </div>

      {/* {driverTripLog.slice(0,6).map((item) => ( */}
      {driverTripLog.map((item) => (
        <div
          key={item.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          {/* Time */}
          <div className="flex lg:block justify-between lg:w-1/6 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Time: </span>
            {formatTime(item.time)}
          </div>

          {/* Driver */}
          <div className="flex lg:block justify-between lg:w-1/6 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Driver: </span>
            {item.driver}
          </div>

          {/* Vehicle (hidden on sm/md) */}
          <div className="hidden lg:block w-1/6 p-3 text-sm text-gray-700">
            {item.vehicleId}
          </div>

          {/* Type (hidden on sm/md) */}
          <div className="hidden lg:block w-1/8 p-1 text-sm text-gray-700">
            <div
              className={`
      border-2 p-2 rounded-full flex justify-center items-center text-white font-semibold
      ${
        item.type === "Delivered"
          ? "bg-green-500 border-green-900"
          : item.type === "In-Progress"
          ? "bg-blue-800 border-blue-950"
          : item.type === "Collected"
          ? "bg-amber-500 border-amber-900"
          : item.type === "Cancelled"
          ? "bg-red-500 border-red-900"
          : "bg-gray-500 border-gray-900"
      }
    `}
            >
              {item.type}
            </div>
          </div>

          {/* Details */}
          <div className="flex lg:block justify-between lg:w-2/6 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Details: </span>
            <span className="line-clamp-1 lg:line-clamp-2">{item.details}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriverTripLog;
