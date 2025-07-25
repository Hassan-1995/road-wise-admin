import { IconType } from "react-icons";
import { LuFuel, LuTriangleAlert, LuTruck, LuUsersRound } from "react-icons/lu";
import PromptCard from "./components/PromptCard";
import PieChart from "./components/PieChart";
import DriverTripLog from "./components/DriverTripLog";
import { Driver, LiveTracker, User, Vehicle } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import WrapperLiveMapPosition from "../components/WrapperLiveMapPosition";

type dashboardType = {
  color: "red" | "yellow" | "green" | "blue" | "purple";
  title: string;
  description: string;
  info: string;
  icon: IconType;
};

const dashboardCartItem: dashboardType[] = [
  {
    color: "blue",
    title: "Active Deliveries",
    description: "+12% from yesterday",
    info: "24",
    icon: LuTruck,
  },
  {
    color: "green",
    title: "Available Drivers",
    description: "Ready for assignment",
    info: "8",
    icon: LuUsersRound,
  },
  {
    color: "yellow",
    title: "Fuel Efficiency",
    description: "+5% improvement",
    info: "12.8 L/100km",
    icon: LuFuel,
  },
  {
    color: "red",
    title: "Maintenance Alert",
    description: "Vehicle needs attention",
    info: "3",
    icon: LuTriangleAlert,
  },
];
const deliveryStatuses = [
  { pending: 12, inTransit: 45, delivered: 87, failed: 3, delayed: 5 },
];
const driverTripLog = [
  {
    id: 1,
    time: "2025-07-10T09:30:00Z",
    type: "Delivered",
    vehicleId: "Vehicle 3",
    driver: "Ali Khan",
    details: "Delivery #432 was completed successfully in Karachi.",
  },
  {
    id: 2,
    time: "2025-07-10T09:15:00Z",
    type: "In-Progress",
    vehicleId: "Vehicle 2",
    driver: "Sarah Ahmed",
    details: "Arrived at Lahore Hub.",
  },
  {
    id: 3,
    time: "2025-07-10T08:55:00Z",
    type: "In-Progress",
    vehicleId: "Vehicle 4",
    driver: "Omer Sheikh",
    details: "Changed status from 'Idle' to 'In Transit'.",
  },
  {
    id: 4,
    time: "2025-07-10T08:40:00Z",
    type: "Cancelled",
    vehicleId: "Vehicle 5",
    driver: "Fatima Noor",
    details: "Delivery #439 failed due to customer not available.",
  },
  {
    id: 5,
    time: "2025-07-10T08:20:00Z",
    type: "In-Progress",
    vehicleId: "Vehicle 1",
    driver: "Ahmed Raza",
    details: "Entered Islamabad Delivery Zone.",
  },
  {
    id: 6,
    time: "2025-07-10T07:55:00Z",
    type: "Cancelled",
    vehicleId: "Vehicle 6",
    driver: "Zara Ali",
    details: "Low tire pressure detected, requires check.",
  },
  {
    id: 7,
    time: "2025-07-10T07:35:00Z",
    type: "In-Progress",
    vehicleId: "Vehicle 2",
    driver: "Sarah Ahmed",
    details: "Departed from Lahore Hub.",
  },
  {
    id: 8,
    time: "2025-07-10T07:15:00Z",
    type: "Collected",
    vehicleId: "Vehicle 7",
    driver: "Imran Malik",
    details: "Assigned Delivery #445 for Gulshan area.",
  },
  {
    id: 9,
    time: "2025-07-10T06:55:00Z",
    type: "In-Progress",
    vehicleId: "Vehicle 3",
    driver: "Ali Khan",
    details: "Changed status from 'Idle' to 'Out for Delivery'.",
  },
  {
    id: 10,
    time: "2025-07-10T06:30:00Z",
    type: "Collected",
    vehicleId: "Vehicle 4",
    driver: "Omer Sheikh",
    details: "Driver checked in and started shift.",
  },
];

type LivePositions = LiveTracker & {
  driver: Pick<Driver, "userId"> & {
    user: Pick<User, "name">;
  };
  vehicle: Pick<Vehicle, "makeModel" | "registrationNumber">;
};

const DashBoard = async () => {
  let live_trackers: LivePositions[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/live-tracker", {
      cache: "no-store", // Ensures fresh data every request
    });
    live_trackers = await res.json();
  } catch (error) {
    console.error("Error fetching live positions:", error);
  }
  console.log("Raw: ", live_trackers);

  const formattedPositions = live_trackers.map((l) => ({
    id: l.id,
    name: l.driver.user.name,
    position: [
      parseFloat(l.latitude as unknown as string),
      parseFloat(l.longitude as unknown as string),
    ] as LatLngExpression,
  }));

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        {dashboardCartItem.map((item, index) => (
          <PromptCard
            key={index}
            title={item.title}
            info={item.info}
            description={item.description}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <section className="flex flex-wrap justify-center lg:justify-between space-y-5">
        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[48%] bg-white shadow border border-zinc-200 rounded-2xl p-4 flex flex-col h-[360px]">
          <h1 className="text-lg font-bold mb-1">Live Vehicle Locations</h1>
          <h2 className="text-sm mb-3 text-gray-600">
            Real-time tracking of fleet vehicles
          </h2>
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <WrapperLiveMapPosition locations={formattedPositions} />
          </div>
        </div>

        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[48%] bg-white shadow border border-zinc-200 rounded-2xl p-4 flex flex-col h-[360px]">
          <h1 className="text-lg font-bold mb-1">
            Delivery Status Distribution
          </h1>
          <h2 className="text-sm mb-3 text-gray-600">
            Current delivery status breakdown
          </h2>
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <PieChart deliveryStatuses={deliveryStatuses[0]} />
          </div>
        </div>
      </section>
      <section>
        <div className="w-full bg-white shadow border border-zinc-200 rounded-2xl p-4 flex flex-col">
          <h1 className="text-lg font-bold mb-1">Recent Activities</h1>
          <h2 className="text-sm mb-3 text-gray-600">
            Latest updates from fleet
          </h2>
          <DriverTripLog driverTripLog={driverTripLog} />
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
