"use client";

import { createSubAdmin } from "@/app/apiFolder/admin";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  employeeNumber: string;
  referenceNumber: string;
};

const SubAdminForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { user } = useAuth();

  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setSuccessMsg(null);

    const subAdmin = {
      id: user!.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      employeeNumber: "EMP-" + data.employeeNumber,
    };
    console.log("Sub-Admin Data: ", subAdmin);

    //

    try {
      const newSubAdmin = await createSubAdmin(subAdmin);

      console.log("Sub Admin Created:", newSubAdmin);
      reset();
      router.push("/users");
    } catch (err) {
      console.error("Error creating sub-admin:", err);
    }
    //
  };

  return (
    <div className="p-4 max-w-2xl bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Create Sub-Admin</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Too short" },
            })}
            type="text"
            className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Full name"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            type="email"
            className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone
          </label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: { value: /^[0-9+ -]{7,20}$/, message: "Invalid phone" },
            })}
            type="tel"
            className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="03xxxxxxxxx"
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Choose a password"
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Employee Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Employee Number
          </label>
          <div className="flex items-center">
            <p className="py-2 font-semibold mr-2">EMP -</p>
            <input
              {...register("employeeNumber", {
                required: "Employee number is required",
              })}
              type="text"
              className="flex-1 border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="XXX"
            />
          </div>
          {errors.employeeNumber && (
            <p className="text-xs text-red-600 mt-1">
              {errors.employeeNumber.message}
            </p>
          )}
        </div>

        {/* Server errors */}
        {serverError && (
          <p className="text-sm text-red-600 mt-1">{serverError}</p>
        )}
        {successMsg && (
          <p className="text-sm text-green-600 mt-1">{successMsg}</p>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`cursor-pointer w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white font-medium
              bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "Creating..." : "Create Sub-Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubAdminForm;
