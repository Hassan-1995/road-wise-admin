"use client";
import React, { useState } from "react";
import { addNewDriver, Driver } from "@/app/apiFolder/driver";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const AddDriverForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Driver>>({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    cnicNumber: "",
    gender: "",
    residenceArea: "",
    licenseNumber: "",
    dateOfBirth: "",
    parentReference: "",
    referenceNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const driverData = {
      adminId: Number(user.id),
      name: formData.name || "",
      contactNumber: formData.contactNumber || "",
      email: formData.email || "",
      password: formData.password || "",
      cnicNumber: formData.cnicNumber || "",
      gender: formData.gender || "",
      dateOfBirth: formData.dateOfBirth || "",
      parentReference: formData.parentReference || "",
      licenseNumber: formData.licenseNumber || "",
      referenceNumber: formData.referenceNumber || "",
      residenceArea: formData.residenceArea || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("🆕 Submitting Driver:", driverData);

    try {
      const response = await addNewDriver(driverData);
      console.log("✅ Driver Added:", response);
      router.push("/drivers");
    } catch (err) {
      console.error("❌ Error adding driver:", err);
      setError("Error adding driver. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4 max-w-2xl"
    >
      <h2 className="text-xl font-semibold mb-2">Add New Driver</h2>

      {/* Name & Phone */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="03XX-XXXXXXX"
            required
          />
        </div>
      </div>

      {/* Email & Password */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
      </div>

      {/* CNIC, Gender, DOB */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">CNIC Number</label>
          <input
            type="text"
            name="cnicNumber"
            value={formData.cnicNumber}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="XXXXX-XXXXXXX-X"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded p-2.5 w-full bg-white"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Parent Ref, License, Ref No */}
      <div className="flex space-x-4">
        {/* <div className="flex-1">
          <label className="block text-sm font-medium">Parent Reference</label>
          <input
            type="text"
            name="parentReference"
            value={formData.parentReference}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div> */}
        <div className="flex-1">
          <label className="block text-sm font-medium">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Reference Number</label>
          <input
            type="text"
            name="referenceNumber"
            value={formData.referenceNumber}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Residence Area */}
      <div>
        <label className="block text-sm font-medium">Residence Area</label>
        <input
          type="text"
          name="residenceArea"
          value={formData.residenceArea}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Add Driver
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
};

export default AddDriverForm;
