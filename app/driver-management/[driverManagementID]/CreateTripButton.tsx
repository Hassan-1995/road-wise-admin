"use client";

import { createTrip } from "@/app/apiFolder/trip";
import { useState } from "react";

type CreateTripButtonProps = {
  label?: string;
  driverID: number | undefined;
};

const CreateTripButton = ({
  label = "Create Trip",
  driverID,
}: CreateTripButtonProps) => {
  const [trip, setTrip] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const vehicleID = localStorage.getItem("Select Vehicle");
    if (!vehicleID) {
      alert("Please select a vehicle before creating a trip.");
      return;
    }
    if (!driverID) {
      alert("Driver ID is missing.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    try {
      const newTrip = {
        driverId: Number(driverID!),
        vehicleId: Number(vehicleID),
      };
      const response = await createTrip(newTrip);
      if (!response.success) {
        throw new Error("Failed to create trip.");
      }
      setTrip(response.insertId);
      localStorage.setItem("currentTripId", String(response.insertId));
      setSuccessMessage(`✅ Trip created successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
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
          loading ? "cursor-not-allowed" : "text-blue-900  hover:text-blue-700"
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
