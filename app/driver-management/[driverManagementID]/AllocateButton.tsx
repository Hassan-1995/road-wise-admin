// "use client";

// import { Driver, User } from "@prisma/client";
// import React from "react";

// type DriverInfo = Driver & {
//   user: Pick<User, "name">;
// };

// type AllocateButtonProps = {
//   label?: string;
//   vehicleId?: number; // pass data you want to save
//   storeId?: number;
//   driverInfo: DriverInfo | null;
// };

// const AllocateButton = ({
//   label = "Allocate",
//   driverInfo,
// }: AllocateButtonProps) => {
//   const handleClick = () => {
//     const formattedData = {
//       driverName: driverInfo?.user.name,
//       driverID: driverInfo?.id,
//       vehicleID: localStorage.getItem("Select Vehicle"),
//       storeID: localStorage.getItem("Select Dropoff"),
//     };
//     console.log("Data to put: ", formattedData);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="cursor-pointer text-blue-900 hover:underline"
//     >
//       {label}
//     </button>
//   );
// };

// export default AllocateButton;

"use client";

import { Driver, User } from "@prisma/client";
import React, { useState } from "react";

type DriverInfo = Driver & {
  user: Pick<User, "name">;
};

type AllocateButtonProps = {
  label?: string;
  vehicleId?: number; // pass data you want to save
  storeId?: number;
  driverInfo: DriverInfo | null;
};

const AllocateButton = ({ label = "Allocate" }: AllocateButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const storeID = localStorage.getItem("Select Dropoff");
    const tripID = localStorage.getItem("currentTripId");

    if (!tripID || !storeID) {
      setMessage("⚠️ Please select both trip and dropoff before allocating.");
      return;
    }

    const formattedData = {
      tripId: Number(tripID),
      storeId: Number(storeID),
    };

    console.log("Data to put: ", formattedData);

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to allocate trip route.");
      }

      setMessage("✅ Allocation successful.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to allocate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`cursor-pointer px-4 py-2 rounded-md font-semibold transition duration-200 ${
          loading
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : // : "bg-blue-600 text-white hover:bg-blue-700"
              "text-blue-900  hover:text-blue-700"
        }`}
      >
        {loading ? <span className="animate-pulse">Allocating...</span> : label}
      </button>
      {message && (
        <p
          className={`text-sm ${
            message.startsWith("✅")
              ? "text-green-600"
              : message.startsWith("⚠️")
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AllocateButton;
