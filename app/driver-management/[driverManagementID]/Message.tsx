"use client";
import React, { useEffect, useState } from "react";

const Message = () => {
  const [tripId, setTripId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  useEffect(() => {
    // Set initial values on mount
    setTripId(localStorage.getItem("currentTripId"));
    setVehicleId(localStorage.getItem("Select Vehicle"));

    // Function to update from localStorage
    const updateFromLocalStorage = () => {
      setTripId(localStorage.getItem("currentTripId"));
      setVehicleId(localStorage.getItem("Select Vehicle"));
    };

    window.addEventListener("storage", updateFromLocalStorage);

    const interval = setInterval(updateFromLocalStorage, 500);

    return () => {
      window.removeEventListener("storage", updateFromLocalStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`mt-4 p-4 rounded-lg text-center font-semibold ${
        tripId && vehicleId
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-yellow-100 text-yellow-800 border border-yellow-300"
      }`}
    >
      {tripId && vehicleId ? (
        <>
          🚚{" "}
          <span className="ml-1">
            A delivery trip is currently in progress.
          </span>
        </>
      ) : (
        <>⚠️ No active delivery trip at the moment.</>
      )}
    </div>
  );
};

export default Message;
