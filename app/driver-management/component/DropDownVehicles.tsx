"use client";
import { getAllVehiclesInfo } from "@/app/apiFolder/vehicle";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

type OptionType = {
  id: number;
  value: string;
};

const DropDownVehicles = () => {
  const label = "Select Vehicle:";
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedId, setSelectedId] = useLocalStorageState<number | null>(
    label,
    {
      defaultValue: null,
    }
  );
  const { user } = useAuth();

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!user) {
        return;
      }
      const allVehicles = await getAllVehiclesInfo(user.role, user.id);
      const availableVehicles = allVehicles
        .filter((v) => v.status === "Available")
        .map((v) => ({
          id: v.id,
          value: v.makeModel,
        }));

      setOptions(availableVehicles);
    };
    fetchVehicles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? parseInt(e.target.value) : null;
    setSelectedId(id);
  };

  return (
    <div className="max-w-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={selectedId ?? ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-900"
      >
        <option value="">-- Choose Vehicle --</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownVehicles;
