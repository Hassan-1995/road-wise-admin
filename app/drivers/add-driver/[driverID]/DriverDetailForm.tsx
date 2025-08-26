"use client";
import { updateDriverById } from "@/app/apiFolder/driver";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  LuUser,
  LuPhone,
  LuCreditCard,
  LuMapPin,
  LuFileText,
  LuCalendarDays,
  LuLoader,
  LuMail,
} from "react-icons/lu";

type FormData = {
  name: string;
  email: string;
  phone: string;
  cnicNumber: string;
  gender: string;
  residenceArea: string;
  licenseNumber: string;
  dateOfBirth: string;
  status: string;
};

type DriverDetailFormProps = {
  driver: FormData;
  driver_id: string;
};

const DriverDetailForm = ({ driver, driver_id }: DriverDetailFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log("ID: ", driver_id);
    const payload = {
      cnicNumber: data.cnicNumber,
      gender: data.gender,
      residenceArea: data.residenceArea,
      licenseNumber: data.licenseNumber,
      status: data.status,
      dateOfBirth: data.dateOfBirth,
    };

    try {
      const updatedDriver = await updateDriverById(Number(driver_id), payload);
      console.log("Driver updated:", updatedDriver);
      alert("Driver updated successfully!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to update driver: " + err.message);
    }
  };

  useEffect(() => {
    if (driver?.gender) setValue("gender", driver.gender);
    if (driver?.status) setValue("status", driver.status);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-12 pt-4 px-4">
      <div className="max-w-2xl ">
        {/* Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p className="text-gray-500 text-sm">
              Please fill all the fields to complete driver registration
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuUser className="w-4 h-4" /> Full Name
                </label>
                <input
                  id="name"
                  defaultValue={driver?.name || ""}
                  {...register("name", { required: "Full name is required" })}
                  placeholder="Enter your full name"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuMail className="w-4 h-4" /> Email Address
                </label>
                <input
                  id="email"
                  defaultValue={driver?.email || ""}
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuPhone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  id="phone"
                  defaultValue={driver?.phone || ""}
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="Enter your phone number"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              {/* CNIC */}
              <div className="space-y-2">
                <label
                  htmlFor="cnicNumber"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuCreditCard className="w-4 h-4" /> CNIC Number
                </label>
                <input
                  id="cnicNumber"
                  defaultValue={driver?.cnicNumber || ""}
                  {...register("cnicNumber", { required: "CNIC is required" })}
                  placeholder="Enter your CNIC number"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.cnicNumber && (
                  <p className="text-sm text-red-500">
                    {errors.cnicNumber.message}
                  </p>
                )}
              </div>
              {/* Gender */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuUser className="w-4 h-4" /> Gender
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setValue("gender", e.target.value)}
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              {/* Residence Area */}
              <div className="space-y-2">
                <label
                  htmlFor="residenceArea"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuMapPin className="w-4 h-4" /> Residence Area
                </label>
                <input
                  id="residenceArea"
                  defaultValue={driver?.residenceArea || ""}
                  {...register("residenceArea", {
                    required: "Residence area is required",
                  })}
                  placeholder="Enter your residence area"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.residenceArea && (
                  <p className="text-sm text-red-500">
                    {errors.residenceArea.message}
                  </p>
                )}
              </div>
              {/* License */}
              <div className="space-y-2">
                <label
                  htmlFor="licenceNumber"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuFileText className="w-4 h-4" /> License Number
                </label>
                <input
                  id="licenceNumber"
                  defaultValue={driver?.licenseNumber || ""}
                  {...register("licenseNumber", {
                    required: "License number is required",
                  })}
                  placeholder="Enter your license number"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.licenseNumber && (
                  <p className="text-sm text-red-500">
                    {errors.licenseNumber.message}
                  </p>
                )}
              </div>
              {/* DOB */}
              <div className="space-y-2">
                <label
                  htmlFor="dateOfBirth"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <LuCalendarDays className="w-4 h-4" /> Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  // defaultValue={driver?.dateOfBirth || ""}
                  defaultValue={
                    (driver?.dateOfBirth &&
                      new Date(driver.dateOfBirth)
                        .toISOString()
                        .split("T")[0]) ||
                    ""
                  }
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuLoader className="w-4 h-4" />
                  Status
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  //   onChange={(e) => setValue("status", e.target.value)}
                >
                  <option value="">Select driver status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer hover:opacity-90 text-blue-900 font-semibold py-2 rounded-md shadow-md border border-blue-900 transition hover:shadow-blue-800"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailForm;
