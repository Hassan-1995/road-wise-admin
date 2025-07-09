"use client";
import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PieChartProps = {
  deliveryStatuses: {
    pending: number;
    inTransit: number;
    delivered: number;
    failed: number;
    delayed: number;
  };
};

const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444", "#f97316"]; // Tailwind Yellow, Blue, Green, Red, Orange

const DeliveryStatusPieChart = ({ deliveryStatuses }: PieChartProps) => {
  const data = [
    { name: "Pending", value: deliveryStatuses.pending },
    { name: "In Transit", value: deliveryStatuses.inTransit },
    { name: "Delivered", value: deliveryStatuses.delivered },
    { name: "Failed", value: deliveryStatuses.failed },
    { name: "Delayed", value: deliveryStatuses.delayed },
  ];

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height={250}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeliveryStatusPieChart;
