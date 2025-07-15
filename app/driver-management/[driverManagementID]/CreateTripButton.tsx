"use client";

import React, { useState } from "react";

type CreateTripButtonProps = {
  label?: string;
  driverID: number | undefined;
};

const CreateTripButton = ({
  label = "Create Trip",
  driverID,
}: CreateTripButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const vehicleID = localStorage.getItem("Select Vehicle");
    if (!vehicleID) {
      alert("Please select a vehicle before creating a trip.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId: driverID,
          vehicleId: Number(vehicleID),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create trip.");
      }

      const data = await response.json();
      localStorage.setItem("currentTripId", data.tripId);
      //   setSuccessMessage(`✅ Trip created successfully (ID: ${data.tripId})`);
      setSuccessMessage(`✅ Trip created successfully`);
    } catch (error) {
      console.error(error);
      setSuccessMessage("❌ Failed to create trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      {successMessage && (
        <p className="m-2 flex-1 text-sm text-green-700">{successMessage}</p>
      )}
      <button
        onClick={handleClick}
        disabled={loading}
        className={`cursor-pointer px-4 py-2 rounded-md font-semibold transition ${
          loading
            ? "cursor-not-allowed"
            : // : "bg-blue-600 text-white hover:bg-blue-700"
              "text-blue-900  hover:text-blue-700"
        }`}
      >
        {loading ? (
          <p className="text-gray-600 animate-pulse">Creating...</p>
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default CreateTripButton;
