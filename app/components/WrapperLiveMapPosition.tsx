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

  console.log("Formatted Positions", formattedPositions);

  if (loading) return <p>Loading live map...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    // <div className="max-w-lg max-h-lvh">
    <LiveMapPositions locations={formattedPositions} />
    // </div>
  );
};

export default WrapperLiveMapPosition;
