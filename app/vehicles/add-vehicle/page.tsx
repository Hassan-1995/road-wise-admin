"use client";
import React, { useState } from "react";
import { addVehicle, Vehicle } from "@/app/apiFolder/vehicle";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const AddVehicleForm = () => {
  const router = useRouter();

  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    vehicleId: "",
    makeModel: "",
    registrationNumber: "",
    status: "Available",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "assignedDriverId" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }
    const vehicleAdd = {
      vehicleId: formData.vehicleId,
      makeModel: formData.makeModel,
      registrationNumber: formData.registrationNumber,
      status: formData.status,
      userID: user.id,
      userRole: user.role,
    };

    console.log("New Vehicle: ", formData);
    try {
      const newVehicle = await addVehicle(vehicleAdd);
      console.log("✅ Vehicle Added:", newVehicle);
      router.push("/vehicles");
    } catch (err) {
      console.error("❌ Error adding vehicle:", err);
      setError("Error adding vehicle. Try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4 max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-2">Add New Vehicle</h2>

      <div>
        <label className="block text-sm font-medium">Vehicle ID</label>
        <input
          type="text"
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="101"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Make / Model</label>
        <input
          type="text"
          name="makeModel"
          value={formData.makeModel}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="e.g. Toyota Corolla"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="e.g. ABC-1234"
          required
        />
      </div>

      {/* <div>
        <label className="block text-sm font-medium">Current Location</label>
        <input
          type="text"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="e.g. Karachi"
        />
      </div> */}

      {/* <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="e.g. 24.8607"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="e.g. 67.0011"
          />
        </div>
      </div> */}

      {/* <div>
        <label className="block text-sm font-medium">Assigned Driver ID</label>
        <input
          type="number"
          name="assignedDriverId"
          value={formData.assignedDriverId}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Driver ID"
        />
      </div> */}

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-2 w-full bg-white"
        >
          <option value="Available">Available</option>
          <option value="In_Transit">In Transit</option>
          <option value="Under_Maintenance">Under Maintenance</option>
          <option value="Idle">Idle</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Add Vehicle
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
};

export default AddVehicleForm;
