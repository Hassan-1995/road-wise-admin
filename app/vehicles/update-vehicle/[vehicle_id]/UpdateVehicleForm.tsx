"use client";
import React, { useState } from "react";
import { updateVehicleByID, Vehicle } from "@/app/apiFolder/vehicle";
import { useRouter } from "next/navigation";

type Props = {
  vehicle: Vehicle;
};

const UpdateVehicleForm = ({ vehicle }: Props) => {
  const [formData, setFormData] = useState(vehicle);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // call update API

    console.log("Updated vehicle:", formData);

    const vehicleUpdated = {
      makeModel: formData.makeModel,
      registrationNumber: formData.registrationNumber,
      status: formData.status,
    };

    try {
      const newVehicle = await updateVehicleByID(vehicle.id, vehicleUpdated);

      console.log("Vehicle Updated:", newVehicle);
      router.push("/vehicles");
    } catch (err) {
      console.error("Error creating sub-admin:", err);
      setError("Error updating vehicle. Try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Make / Model</label>
        <input
          name="makeModel"
          value={formData.makeModel}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Registration Number</label>
        <input
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
        Save Changes
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UpdateVehicleForm;
