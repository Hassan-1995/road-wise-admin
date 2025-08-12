"use client";
import {
  getAllVehiclesMaintenanceInfo,
  VehicleMaintenanceInfo,
} from "@/app/apiFolder/maintenance-log";
import PromptCard from "@/app/Dashboard/components/PromptCard";
import { useEffect, useState } from "react";
import { LuClipboardList, LuFuel, LuWallet } from "react-icons/lu";
// import { MdCancel, MdCheckCircle } from "react-icons/md";

const FuelLogTable = () => {
  const [showMonths, setShowMonths] = useState(false);
  const [fuelData, setFuelData] = useState<VehicleMaintenanceInfo[] | []>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  const [filterData, setFilterData] = useState<VehicleMaintenanceInfo[] | []>(
    []
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchMaintenaceData = async () => {
      try {
        const response = await getAllVehiclesMaintenanceInfo();
        if (!response) {
          console.error("Failed to fetch vehicle-maintenance data");
          return;
        }
        console.log(
          "Maintenance Data: ",
          response.filter((f) => f.liters !== null)
        );
        setFuelData(response.filter((f) => f.liters !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMaintenaceData();
  }, []);

  const handleMonthSelect = (index: number) => {
    setSelectedMonth(index);
    setShowMonths(false);
    console.log("Selected Month:", months[index]); // for debugging / further filtering logic
  };

  const formatTime = (dateString: string) => {
    const shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const day = String(date.getDate()).padStart(2, "0");
    const month = shortMonths[date.getMonth()];
    return `${timePart} ${day}-${month}`;
  };

  const filterMonthData = () => {
    const temp = fuelData.filter(
      (f) => new Date(f.maintenanceDate).getMonth() === selectedMonth
    );
    setFilterData(temp);
  };

  useEffect(() => {
    filterMonthData();
  }, [selectedMonth, fuelData]);

  return (
    <div className="w-full relative">
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <PromptCard
          title={"Total Fuel Logs"}
          info={String(filterData.length)}
          description={"Fuel entries logged this month."}
          icon={LuClipboardList}
          color={"blue"}
        />
        <PromptCard
          title={"Total Cost"}
          info={
            "Rs: " +
            filterData
              .reduce((acc, item) => {
                return acc + Number(item.costRs);
              }, 0)
              .toLocaleString()
          }
          description={"Total fuel spending this month."}
          icon={LuWallet}
          color={"green"}
        />
        <PromptCard
          title={"Total Liters"}
          info={
            filterData
              .reduce((acc, item) => {
                return acc + Number(item.liters);
              }, 0)
              .toLocaleString() + " L"
          }
          description={"Liters refueled this month."}
          icon={LuFuel}
          color={"yellow"}
        />
      </div>

      {/* Month Selector */}
      <div className="relative inline-block mb-4">
        <button
          onClick={() => setShowMonths(!showMonths)}
          className="cursor-pointer w-40 px-3 py-2 flex text-blue-900 font-semibold rounded-xl hover:underline underline-offset-[5px]"
        >
          Month: {months[selectedMonth]}
        </button>

        {showMonths && (
          <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow w-40 max-h-60 overflow-y-auto">
            {months.map((month, index) => (
              <div
                key={index}
                onClick={() => handleMonthSelect(index)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {month}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/7 p-3">Time Stamp</div>
        <div className="w-1/7 p-3">Make & Model</div>
        <div className="w-1/7 p-3">KM Driven</div>
        <div className="w-1/7 p-3">Liters</div>
        <div className="w-1/7 p-3">Cost (Rs)</div>
        <div className="w-1/7 p-3">Driver</div>
        <div className="w-1/7 p-3">Notes</div>
      </div>

      {/* {fuelInfo.map((fuel) => ( */}
      {filterData.map((fuel, idx) => (
        <div
          key={idx}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Time Stamp:</span>
            {formatTime(String(fuel.maintenanceDate))}
          </div>

          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Make & Model:</span>
            {fuel.makeModel}
          </div>

          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">KM Driven:</span>
            {Number(fuel.odometerKm).toLocaleString()}
          </div>

          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Liters:</span>
            {Number(fuel.liters).toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </div>

          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Cost(Rs):</span>
            {Number(fuel.costRs).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>

          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Driver:</span>
            {/* Calculate Later */}
            {fuel.name}
          </div>
          <div className="flex lg:block justify-between lg:w-1/7 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Notes:</span>
            {/* Calculate Later */}
            {fuel.notes}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FuelLogTable;
