"use client";

import { createTrip } from "@/app/apiFolder/trip";
import { updateAssignedDriver } from "@/app/apiFolder/vehicle";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

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

  // ✅ use hook instead of raw localStorage
  const [tripId, setTripId] = useLocalStorageState<number | null>(
    "currentTripId",
    {
      defaultValue: null,
    }
  );

  const { user } = useAuth();

  const handleClick = async () => {
    const vehicleID = localStorage.getItem("Select Vehicle"); // (we can convert this too later if needed)
    if (!vehicleID) {
      alert("Please select a vehicle before creating a trip.");
      return;
    }
    if (!driverID) {
      alert("Driver ID is missing.");
      return;
    }
    if (!user) {
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    try {
      const newTrip = {
        driverId: Number(driverID),
        vehicleId: Number(vehicleID),
        createdById: user.id,
        createdByRole: user.role,
      };
      await updateAssignedDriver(
        newTrip.vehicleId,
        newTrip.driverId,
        user.id,
        user.role
      );
      const response = await createTrip(newTrip);

      // if (!response.success ) {
      if (!response.success) {
        throw new Error("Failed to create trip.");
      }

      setTrip(response.insertId);
      setTripId(response.insertId); // ✅ update via hook → TripMessage updates instantly

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
          loading ? "cursor-not-allowed" : "text-blue-900 hover:text-blue-700"
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
