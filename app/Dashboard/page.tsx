import React from "react";
import PromptCard from "./components/PromptCard";
import { LuFuel, LuTriangleAlert, LuTruck, LuUsersRound } from "react-icons/lu";
import { IconType } from "react-icons";

// import FleetMap from "./components/FleetMap";
// import BarChart from "./components/BarChart";
import DeliveryStatusPieChart from "./components/PieChart";

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

const DashBoard = () => {
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
      <div className="flex flex-wrap justify-center lg:justify-between space-y-5">
        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[48%] bg-white shadow border border-zinc-200 rounded-2xl p-4 flex flex-col h-[360px]">
          <h1 className="text-lg font-bold mb-1">Live Vehicle Locations</h1>
          <h2 className="text-sm mb-3 text-gray-600">
            Real-time tracking of fleet vehicles
          </h2>
          <div className="flex-1 relative rounded-lg overflow-hidden">
            {/* <FleetMap /> */}
          </div>
        </div>

        <div className="w-full sm:w-[90%] md:w-[90%] lg:w-[48%] bg-white shadow border border-zinc-200 rounded-2xl p-4 flex flex-col h-[400px]">
          <h1 className="text-lg font-bold mb-1">
            Delivery Status Distribution
          </h1>
          <h2 className="text-sm mb-3 text-gray-600">
            Current delivery status breakdown
          </h2>
          {/* <div className="flex-1 rounded-lg">
            <BarChart deliveryStatuses={deliveryStatuses[0]} />
          </div> */}
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <DeliveryStatusPieChart deliveryStatuses={deliveryStatuses[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
