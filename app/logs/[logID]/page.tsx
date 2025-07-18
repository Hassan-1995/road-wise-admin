import { Driver, Route, Store, Trip, User, Vehicle } from "@prisma/client";
import React from "react";
import DriverTripTable from "../component/DriverTripTable";

type DriverLogsProps = {
  params: { logID: string };
};

type Trips = Trip & {
  driver: Pick<Driver, "userId"> & {
    user: Pick<User, "name">;
  };
  // routes: (Pick<Route, "storeId"> & {
  dropoutAssigns: (Pick<Route, "storeId"> & {
    store: Pick<Store, "storeName" | "address">;
  })[];
  vehicle: Pick<Vehicle, "makeModel" | "registrationNumber">;
};

const DriverLogs = async ({ params: { logID } }: DriverLogsProps) => {
  let trips: Trips[] = [];

  try {
    const res = await fetch(`http://localhost:3000/api/trip/${logID}`, {
      cache: "no-store", // Ensures fresh data every request
    });
    trips = await res.json();
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }

  const formattedTripsWRTDriver = trips.map((t) => ({
    id: t.id,
    name: t.driver.user.name,
    vehicle: t.vehicle.makeModel,
    numberPlate: t.vehicle.registrationNumber,
    store:
      t.dropoutAssigns.length > 0
        ? t.dropoutAssigns.map((r) => r.store.storeName).join("\n")
        : "N/A",
    begin: t.startTime,
    finish: t.endTime,
    distance: t.distanceKm ? t.distanceKm.toString() : null,
    status: t.status,
    notes: t.notes,
  }));

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">
        Trips and Delivery Logs of Driver{" "}
        {formattedTripsWRTDriver[0].name || "N/A"}
      </h1>
      {/* <DriverTripTable trips={trips} /> */}
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <DriverTripTable trips={formattedTripsWRTDriver} />
      </div>
    </div>
  );
};

export default DriverLogs;
