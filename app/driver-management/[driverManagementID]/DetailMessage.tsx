"use client";
import { DropoutAssignment, Store, Vehicle } from "@prisma/client";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

type DetailMessageProps = {
  driverName: string | undefined;
};

type DropoutAssignmentWitStoreName = DropoutAssignment & {
  store: Pick<Store, "storeName">;
};

const DetailMessage = ({ driverName }: DetailMessageProps) => {
  const [tripId] = useLocalStorageState<number | null>("currentTripId", {
    defaultValue: null,
  });
  const [vehicleId] = useLocalStorageState<number | null>("Select Vehicle", {
    defaultValue: null,
  });

  const [vehicleData, setVehicleData] = useState<Vehicle>();
  const [routeData, setRouteData] = useState<DropoutAssignmentWitStoreName[]>();

  useEffect(() => {
    fetchVehicle();
    fetchRoute();
  }, [vehicleId, tripId]);

  const fetchVehicle = async () => {
    if (!vehicleId) return;
    try {
      const res = await fetch(`/api/vehicle/${vehicleId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch vehicle data");
        return;
      }

      const data = await res.json();
      setVehicleData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchRoute = async () => {
    if (!tripId) return;
    try {
      const res = await fetch(`/api/dropout-assignment/${tripId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch route data");
        return;
      }

      const data = await res.json();
      setRouteData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                {item.store.storeName ?? "Loading..."}
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
