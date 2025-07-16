"use client";
import useLocalStorageState from "use-local-storage-state";

const TripMessage = () => {
  const [tripId] = useLocalStorageState<number | null>("currentTripId", {
    defaultValue: null,
  });
  const [vehicleId] = useLocalStorageState<number | null>("Select Vehicle", {
    defaultValue: null,
  });

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
            A delivery trip # {tripId} is currently in progress.
          </span>
        </>
      ) : (
        <>⚠️ No active delivery trip at the moment.</>
      )}
    </div>
  );
};

export default TripMessage;
