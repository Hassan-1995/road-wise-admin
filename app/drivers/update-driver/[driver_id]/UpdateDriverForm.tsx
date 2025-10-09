"use client";

import React, { useState } from "react";
import { Driver, updateDriverById } from "@/app/apiFolder/driver";
import { useRouter } from "next/navigation";

interface Props {
  driver: Driver;
}

const UpdateDriverForm: React.FC<Props> = ({ driver }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Driver>>({
    name: driver.name || "",
    contactNumber: driver.contactNumber || "",
    email: driver.email || "",
    cnicNumber: driver.cnicNumber || "",
    gender: driver.gender || "",
    residenceArea: driver.residenceArea || "",
    licenseNumber: driver.licenseNumber || "",
    dateOfBirth: driver.dateOfBirth || "",
    status: driver.status || "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await updateDriverById(driver.id!, formData);
      setMessage("✅ Driver updated successfully!");
      console.log("Updated Driver:", response);
      setTimeout(() => router.push("/drivers"), 1200); // redirect back after success
    } catch (error: any) {
      console.error("Error updating driver:", error);
      setMessage("❌ Failed to update driver. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      {/* Contact Number */}
      <div>
        <label className="block font-medium">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      {/* CNIC */}
      <div>
        <label className="block font-medium">CNIC Number</label>
        <input
          type="text"
          name="cnicNumber"
          value={formData.cnicNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Residence Area */}
      <div>
        <label className="block font-medium">Residence Area</label>
        <input
          type="text"
          name="residenceArea"
          value={formData.residenceArea}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* License Number */}
      <div>
        <label className="block font-medium">License Number</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block font-medium">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Updating..." : "Update Driver"}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`text-center text-sm font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default UpdateDriverForm;
