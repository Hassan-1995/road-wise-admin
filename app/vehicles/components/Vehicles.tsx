"use client";

import React, { useEffect, useState } from "react";
import {
  deleteVehicleByID,
  getAllVehiclesInfo,
  Vehicle,
} from "@/app/apiFolder/vehicle";
import { useAuth } from "@/context/AuthProvider";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchVehicles = async () => {
      try {
        const data = await getAllVehiclesInfo(user.role, user.id);
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles data.");
      } finally {
        setLoading(false);
      }
    };

    console.log("Vehicles: ", vehicles);
    fetchVehicles();
  }, [user]);

  const handleDelete = async (vehicleId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle? This action cannot be undone."
    );
    if (confirmed) {
      console.log("Delete vehicle:", vehicleId);
      await deleteVehicleByID(vehicleId);
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId));
    }
  };

  if (loading)
    return <p className="p-4 text-gray-500 italic">Loading vehicles...</p>;

  if (error)
    return (
      <p className="p-4 text-red-600 bg-red-50 border border-red-200 rounded">
        {error}
      </p>
    );

  if (vehicles.length === 0)
    return <p className="p-4 text-gray-600 italic">No vehicles found.</p>;

  return (
    <div className="w-full">
      {/* ===== Header (Desktop Only) ===== */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/5 p-3">Vehicle ID</div>
        <div className="w-1/5 p-3">Make / Model</div>
        <div className="w-1/5 p-3">Registration</div>
        <div className="w-1/5 p-3">Status</div>
        <div className="w-1/5 p-3">Action</div>
      </div>

      {/* ===== Vehicle Rows ===== */}
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          <VehicleRow label="Vehicle ID" value={vehicle.vehicleId} />
          <VehicleRow label="Make / Model" value={vehicle.makeModel} />
          <VehicleRow label="Registration" value={vehicle.registrationNumber} />
          <VehicleRow label="Status" value={vehicle.status} />

          {/* ===== Action Buttons ===== */}
          <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Action: </span>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(vehicle.id)}
                className="cursor-pointer text-red-500 hover:text-lg hover:text-red-700"
                title="Delete Vehicle"
              >
                <FiTrash2 size={18} />
              </button>
              <Link
                href={`/vehicles/update-vehicle/${vehicle.id}`}
                className="cursor-pointer text-blue-500 hover:text-lg hover:text-blue-700"
                title="Edit Vehicle"
              >
                <FiEdit2 size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ✅ Small Reusable Component for Rows */
const VehicleRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div className="flex lg:block justify-between lg:w-1/5 p-3 text-sm text-gray-700">
    <span className="lg:hidden font-medium">{label}: </span>
    {value ?? "—"}
  </div>
);

export default Vehicles;
