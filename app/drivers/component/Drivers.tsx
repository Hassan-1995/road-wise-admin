"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiRefreshCw,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { MdFemale, MdMale } from "react-icons/md";
import { useAuth } from "@/context/AuthProvider";
import {
  deleteDriverById,
  Driver,
  getAllDriversInfo,
} from "@/app/apiFolder/driver";

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // 🔹 Fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getAllDriversInfo(user.role, user.id);
        setDrivers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError("Failed to load driver data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, [user]);

  // 🔹 Gender Icon Memoized
  const getStatusIcon = useMemo(
    () => (status: string | null) => {
      switch (status) {
        case "Approved":
          return <FiCheckCircle className="text-green-500 w-5 h-5" />;
        case "Pending":
          return <FiClock className="text-yellow-500 w-5 h-5" />;
        case "Ongoing":
          return (
            <FiRefreshCw className="text-blue-500 w-5 h-5 animate-spin-slow" />
          );
        case "Cancelled":
          return <FiXCircle className="text-red-500 w-5 h-5" />;
        default:
          return <span className="text-gray-400">N/A</span>;
      }
    },
    []
  );

  // 🔹 Delete Handler
  const handleDelete = useCallback(async (id: number) => {
    if (!confirm("Are you sure you want to delete this driver?")) return;
    try {
      await deleteDriverById(id);
      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    } catch (err) {
      console.error("Error deleting driver:", err);
      alert("Failed to delete driver.");
    }
  }, []);

  // 🔹 Loading & Error UI
  if (loading) return <p className="p-4 text-gray-600">Loading drivers...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden lg:flex bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        {["Name", "Phone", "Email", "CNIC Number", "Status", "Action"].map(
          (header, idx) => (
            <div key={idx} className="flex-1 p-3 min-w-[100px]">
              {header}
            </div>
          )
        )}
      </div>

      {/* Driver Rows */}
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 p-3 text-sm text-gray-700">{driver.name}</div>

          <div className="flex-1 p-3 text-sm text-gray-700">
            {driver.contactNumber ?? "N/A"}
          </div>
          <div className="flex-1 p-3 text-sm text-gray-700">
            {driver.email ?? "N/A"}
          </div>
          <div className="flex-1 p-3 text-sm text-gray-700">
            {driver.cnicNumber ?? "N/A"}
          </div>

          <div className="flex-1 p-3 text-sm text-gray-700">
            {getStatusIcon(driver.status!)}
          </div>
          <div className="flex-1 p-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(driver.id!)}
                className="cursor-pointer text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                title="Delete Driver"
              >
                <FiTrash2 size={18} />
              </button>
              <Link
                href={`/drivers/update-driver/${driver.id}`}
                className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-110"
                title="Edit Driver"
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

export default Drivers;
