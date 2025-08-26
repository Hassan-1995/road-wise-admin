"use client";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { assignDropoffs } from "@/app/apiFolder/droupout-assignment";
import { Driver } from "@/app/apiFolder/driver";

type AllocateButtonProps = {
  label?: string;
  driverInfo: Driver;
};

const AllocateButton = ({
  label = "Allocate",
  driverInfo,
}: AllocateButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ use the hook for the refresh flag
  const [, setRefreshDropoffs] = useLocalStorageState<number>(
    "refreshDropoffs",
    {
      defaultValue: 0,
    }
  );

  const handleClick = async () => {
    const storeID = localStorage.getItem("Select Dropoff");
    const tripID = localStorage.getItem("currentTripId");

    if (!tripID || !storeID || !driverInfo.id) {
      setMessage(
        "⚠️ Please select trip, driver and dropoff before allocating."
      );
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formattedData = {
        tripId: Number(tripID),
        storeId: Number(storeID),
        driverId: Number(driverInfo.id),
      };

      const response = await assignDropoffs(formattedData);
      if (!response.success) throw new Error("Failed to assign dropoff.");

      setMessage("✅ Allocation successful.");

      // 🔔 trigger re-fetch for DetailMessage (same-tab safe)
      setRefreshDropoffs(Date.now());

      setTimeout(() => setMessage(null), 3000);
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
            : "text-blue-900 hover:text-blue-700"
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
