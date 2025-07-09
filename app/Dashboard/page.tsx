import React from "react";
import PromptCard from "./components/PromptCard";
import { LuFuel, LuTriangleAlert, LuTruck, LuUsersRound } from "react-icons/lu";
import { IconType } from "react-icons";

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

const DashBoard = () => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 overflow-x-auto pb-2">
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
    </div>
  );
};

export default DashBoard;
