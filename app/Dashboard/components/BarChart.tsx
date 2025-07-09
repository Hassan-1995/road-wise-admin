import React from "react";

type BarChartProps = {
  deliveryStatuses: {
    pending: number;
    inTransit: number;
    delivered: number;
    failed: number;
    delayed: number;
  };
};

const BarChart = ({ deliveryStatuses }: BarChartProps) => {
  const { pending, inTransit, delivered, failed, delayed } = deliveryStatuses;

  const total = pending + inTransit + delivered + failed + delayed;

  // Avoid division by zero
  const getPercentage = (count: number) =>
    total === 0 ? 0 : (count / total) * 100;

  const bars = [
    { label: "Pending", count: pending, color: "bg-yellow-500" },
    { label: "In Transit", count: inTransit, color: "bg-blue-500" },
    { label: "Delivered", count: delivered, color: "bg-green-500" },
    { label: "Failed", count: failed, color: "bg-red-500" },
    { label: "Delayed", count: delayed, color: "bg-orange-500" },
  ];

  const MAX_HEIGHT = 350;

  return (
    <div className="w-full h-full flex items-end justify-around p-4 rounded-xl bg-zinc-100">
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center">
          <div
            className={`w-10 rounded-t-md ${bar.color}`}
            style={{
              height: `${(getPercentage(bar.count) / 100) * MAX_HEIGHT}px`,
              transition: "height 0.5s",
            }}
            title={`${bar.label}: ${bar.count} (${getPercentage(
              bar.count
            ).toFixed(1)}%)`}
          />
          <span className="text-xs mt-1 text-center">{bar.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
