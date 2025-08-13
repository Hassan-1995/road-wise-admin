"use client";

import type { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDriverLivePosition, LiveTracker } from "../apiFolder/live-tracker";

const LiveMapPositions = dynamic(() => import("./LiveMapPosition"), {
  ssr: false,
});

const WrapperLiveMapPosition = () => {
  const [drivers, setDrivers] = useState<LiveTracker[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<LiveTracker | null>(
    null
  );
  const [showDrivers, setShowDrivers] = useState(false);
  const [pickPosition, setPickPosition] = useState<{
    id: number;
    name: string;
    position: LatLngExpression;
    status: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let live_trackers: LiveTracker[] = [];
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        live_trackers = await getDriverLivePosition();
        setDrivers(live_trackers);
        setError(null);
      } catch (error) {
        console.error("Error fetching driver data:", error);
        setError("Failed to load drivers live position.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const formattedPositions = drivers.map((l) => ({
    id: l.id,
    name: l.driverName,
    position: [
      parseFloat(l.latitude as unknown as string),
      parseFloat(l.longitude as unknown as string),
    ] as LatLngExpression,
    status: l.status,
  }));

  const handleMonthSelect = (pickDriver: LiveTracker) => {
    setSelectedDriver(pickDriver);
    setShowDrivers(false);
    const newPickPosition = {
      id: pickDriver.id,
      name: pickDriver.driverName,
      position: [
        parseFloat(pickDriver.latitude as unknown as string),
        parseFloat(pickDriver.longitude as unknown as string),
      ] as LatLngExpression,
      status: pickDriver.status,
    };

    setPickPosition(newPickPosition);
    console.log("Selected Driver:", pickPosition); // for debugging / further filtering logic
  };

  console.log("Formatted Positions", formattedPositions);
  console.log("Raw Data", drivers);

  if (loading) return <p>Loading live map...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div className="h-screen flex flex-row">
      <div className="w-[80%] h-[80vh] rounded-xl shadow overflow-hidden">
        {/* <LiveMapPositions locations={[pickPosition] || formattedPositions} /> */}
        <LiveMapPositions
          locations={pickPosition ? [pickPosition] : formattedPositions}
        />
      </div>
      <div className="w-[20%] h-[80vh] flex-1 flex-row overflow-hidden">
        {/* Driver Selector */}
        <div className="inline-block mb-4 w-[100%]">
          <button
            onClick={() => setShowDrivers(!showDrivers)}
            className="cursor-pointer px-3 py-2 flex text-blue-900 font-semibold rounded-xl hover:underline underline-offset-[5px]"
          >
            Driver: {selectedDriver?.driverName || "All"}
          </button>

          {showDrivers && (
            <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow w-40 max-h-60 overflow-y-auto">
              {drivers.map((driver, index) => (
                <div
                  key={index}
                  onClick={() => handleMonthSelect(driver)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {driver.driverName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WrapperLiveMapPosition;
