"use client";

import { SubAdmin, updateSubAdmin } from "@/app/apiFolder/admin";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  employeeNumber: string;
  referenceNumber: string;
};

type UpdateSubAdminFormProps = {
  subAdmin: SubAdmin[];
};

const UpdateSubAdminForm = ({ subAdmin }: UpdateSubAdminFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { user } = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    try {
      if (subAdmin && subAdmin.length > 0) {
        const sub = subAdmin[0];
        reset({
          name: sub.name || "",
          email: sub.email || "",
          phone: sub.contactNumber || "",
          employeeNumber: sub.employeeNumber?.replace("EMP-", "") || "",
          password: "",
        });
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching sub-admins:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [subAdmin, reset]);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setSuccessMsg(null);

    const subAdminUpdated = {
      id: subAdmin[0].id,
      adminUserId: user!.id,
      subAdminUserId: subAdmin[0].sub_admin_userID,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      employeeNumber: "EMP-" + data.employeeNumber,
    };
    console.log("Sub-Admin Data NEW: ", subAdminUpdated);
    console.log("Sub-Admin Data FETCHED: ", subAdmin);

    //
    try {
      const newSubAdmin = await updateSubAdmin(subAdminUpdated);

      console.log("Sub Admin Updated:", newSubAdmin);
      router.push("/users");
    } catch (err) {
      console.error("Error creating sub-admin:", err);
      setError("Error creating sub-admin. Try again later.");
    }

    //
  };

  return (
    <div className="p-4 max-w-2xl bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Update Sub-Admin</h2>

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
            {isSubmitting ? "Updating..." : "Update Sub-Admin"}
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateSubAdminForm;
