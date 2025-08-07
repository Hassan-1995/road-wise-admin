import DriverTripTable from "../component/DriverTripTable";
import { getTripsByDriverID, Trip } from "@/app/apiFolder/trip";

type DriverLogsProps = {
  params: Promise<{ logID: string }>;
};

const DriverLogs = async ({ params }: DriverLogsProps) => {
  let trips: Trip[] = [];
  let formattedTripsWRTDriver: any[] = [];

  const logID = (await params).logID;

  try {
    trips = await getTripsByDriverID(Number(logID));

    formattedTripsWRTDriver = Object.values(
      trips.reduce((acc, t) => {
        const trip = (acc[t.id!] ||= {
          id: t.id,
          name: t.name,
          vehicle: t.makeModel,
          numberPlate: t.registrationNumber,
          storeNames: new Set(),
          begin: t.startTime,
          finish: t.endTime,
          distance: t.distanceKm?.toString() || null,
          status: t.status,
          notes: t.notes,
        });

        t.storeName && trip.storeNames.add(t.storeName);
        return acc;
      }, {} as Record<number, any>)
    ).map(({ storeNames, ...trip }) => ({
      ...trip,
      store: storeNames.size ? [...storeNames].join("\n") : "N/A",
    }));
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">
        Trips and Delivery Logs of Driver{" "}
        {formattedTripsWRTDriver[0]?.name || "N/A"}
      </h1>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <DriverTripTable trips={formattedTripsWRTDriver} />
      </div>
    </div>
  );
};

export default DriverLogs;
