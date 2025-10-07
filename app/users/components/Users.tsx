"use client";
import {
  SubAdmin,
  deleteSubAdminByID,
  getSubAdminByAdminID,
} from "@/app/apiFolder/admin";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Users = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchSubAdmins = async () => {
      if (!user) return;
      try {
        const data = await getSubAdminByAdminID(user.id);
        setSubAdmins(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching sub-admins:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubAdmins();
  }, [user]);

  console.log("User ID: ", user?.id);
  console.log("SubAdmin: ", subAdmins);

  const handleDeleteSubAdmin = async (subAdminId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sub-admin?\nThis action will permanently remove all related records and cannot be undone."
    );

    if (!confirmed) return;
    try {
      await deleteSubAdminByID(subAdminId);
      setSubAdmins((prev) => prev.filter((sub) => sub.id !== subAdminId));
    } catch (error) {
      console.error("Error deleting sub-admin:", error);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading Users...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  console.log("Sub-Admin:", subAdmins);
  return (
    <div className="w-full mx-auto bg-white shadow rounded-md overflow-hidden">
      {/* Header */}
      <div className="hidden lg:flex bg-gray-100 border-b border-zinc-300 font-semibold text-sm text-gray-700">
        <div className="w-1/6 p-3">Name</div>
        <div className="w-1/6 p-3">Employee #</div>
        <div className="w-1/6 p-3">Phone</div>
        <div className="w-1/6 p-3">Reference #</div>
        <div className="w-1/6 p-3">Created At</div>
        <div className="w-1/6 p-3">Updated At</div>
        <div className="w-1/6 p-3">Action</div>
      </div>

      {subAdmins.map((subAdmin) => (
        <div
          key={subAdmin.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors text-sm"
        >
          {/* Mobile-friendly labels */}
          <div className="flex lg:block justify-between w-full lg:w-1/6 p-3 text-gray-800">
            <span className="lg:hidden font-medium">Name: </span>
            {subAdmin.name}
          </div>

          <div className="flex lg:block justify-between w-full lg:w-1/6 p-3 text-gray-800">
            <span className="lg:hidden font-medium">Employee #: </span>
            {subAdmin.employeeNumber}
          </div>

          <div className="flex lg:block justify-between w-full lg:w-1/6 p-3 text-gray-800">
            <span className="lg:hidden font-medium">Phone: </span>
            {subAdmin.contactNumber}
          </div>

          <div className="flex lg:block justify-between w-full lg:w-1/6 p-3 text-gray-800">
            <span className="lg:hidden font-medium">Reference #: </span>
            {subAdmin.referenceNumber}
          </div>

          <div className="flex lg:block justify-between w-full lg:w-1/6 p-3 text-gray-800">
            <span className="lg:hidden font-medium">Created At: </span>
            {new Date(subAdmin.createdAt).toLocaleDateString()}
          </div>

          <div className="flex lg:block justify-between w-full lg:w-1/6 p-3 text-gray-800">
            <span className="lg:hidden font-medium">Updated At: </span>
            {new Date(subAdmin.updatedAt).toLocaleDateString()}
          </div>

          <div className="flex items-center justify-start w-full lg:w-1/6 p-3 text-gray-800 space-x-5">
            <span className="lg:hidden font-medium">Action:</span>

            <button
              onClick={() => handleDeleteSubAdmin(subAdmin.id)}
              className="cursor-pointer text-red-500 hover:text-lg hover:text-red-700"
            >
              <FiTrash2 />
            </button>

            <Link
              href={`/users/update-sub-admin/${subAdmin.id}`}
              className="cursor-pointer text-blue-500 hover:text-lg hover:text-blue-700"
            >
              <FiEdit2 />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
