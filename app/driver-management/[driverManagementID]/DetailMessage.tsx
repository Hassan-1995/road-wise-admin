"use client";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  getDropoffsByTripID,
  DropoutAssignment,
} from "@/app/apiFolder/droupout-assignment";
import { getVehicleByID, Vehicle } from "@/app/apiFolder/vehicle";

type DetailMessageProps = { driverName: string | undefined };

const DetailMessage = ({ driverName }: DetailMessageProps) => {
  const [tripId] = useLocalStorageState<number | null>("currentTripId", {
    defaultValue: null,
  });
  const [vehicleId] = useLocalStorageState<number | null>("Select Vehicle", {
    defaultValue: null,
  });

  // ✅ listen to the same refresh flag
  const [refreshDropoffs] = useLocalStorageState<number>("refreshDropoffs", {
    defaultValue: 0,
  });

  const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);
  const [routeData, setRouteData] = useState<DropoutAssignment[] | null>(null);

  // fetch vehicle when vehicleId changes
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!vehicleId) return;
      try {
        const response = await getVehicleByID(Number(vehicleId));
        if (!response) return;
        setVehicleData(response);
      } catch (e) {
        console.error("Error fetching vehicle:", e);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  // fetch route when tripId changes OR refresh flag flips
  useEffect(() => {
    const fetchRoute = async () => {
      if (!tripId) return;
      try {
        const response = await getDropoffsByTripID(Number(tripId));
        setRouteData(response);
      } catch (e) {
        console.error("Error fetching route:", e);
      }
    };
    fetchRoute();
  }, [tripId, refreshDropoffs]); // 👈 re-fetch after allocation

  // ...render UI (unchanged)
  return (
    <div className="mt-6 p-6 rounded-2xl border border-blue-900 bg-blue-50 shadow-sm max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 mb-3">
        <h1 className="text-blue-900 font-semibold">
          Driver: <span className="font-normal">{driverName ?? "N/A"}</span>
        </h1>
        <h1 className="text-blue-900 font-semibold">
          Trip ID: <span className="font-normal">{tripId ?? "N/A"}</span>
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 mb-3">
        <h1 className="text-blue-900 font-semibold">
          Vehicle:{" "}
          <span className="font-normal">
            {vehicleData?.makeModel ?? "Loading..."}
          </span>
        </h1>
        <h1 className="text-blue-900 font-semibold">
          Reg#:{" "}
          <span className="font-normal">
            {vehicleData?.registrationNumber ?? "Loading..."}
          </span>
        </h1>
      </div>

      <div className="flex justify-between mb-4">
        <h1 className="text-blue-900 font-semibold">
          Allocated Drop-offs:{" "}
          <span className="font-normal">
            {routeData?.length ?? "Loading..."}
          </span>
        </h1>
      </div>

      {Array.isArray(routeData) && routeData.length > 0 ? (
        <div className="space-y-2">
          {routeData.map((item, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-white border border-blue-200 shadow-sm flex justify-between items-center"
            >
              <h1 className="text-blue-800 font-medium">
                {item.storename ?? "Loading..."}
              </h1>
              <span className="text-sm text-blue-600">
                Store ID: {item.storeId}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-700 text-sm">No routes available.</p>
      )}
    </div>
  );
};

export default DetailMessage;
