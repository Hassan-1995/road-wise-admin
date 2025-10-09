// "use client";

// import { useForm } from "react-hook-form";
// import {
//   LuCar,
//   LuUser,
//   LuMail,
//   LuPhone,
//   LuCreditCard,
//   LuMapPin,
//   LuFileText,
//   LuCalendarDays,
// } from "react-icons/lu";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   cnicNumber: string;
//   gender: string;
//   residenceArea: string;
//   licenceNumber: string;
//   dateOfBirth: string;
// }

// const DriverOnboarding = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>();

//   const onSubmit = async (data: FormData) => {
//     console.log(data);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-subtle pb-12 pt-4 px-4">
//       <div className="max-w-2xl ">
//         {/* Header */}
//         <h1 className="text-lg font-bold  mb-4">Driver Registration</h1>

//         {/* Card */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Personal Information</h2>
//             <p className="text-gray-500 text-sm">
//               Please fill all the fields to complete driver registration
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Full Name */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="name"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuUser className="w-4 h-4" /> Full Name
//                 </label>
//                 <input
//                   id="name"
//                   {...register("name", { required: "Full name is required" })}
//                   placeholder="Enter your full name"
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-red-500">{errors.name.message}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuMail className="w-4 h-4" /> Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   {...register("email", { required: "Email is required" })}
//                   placeholder="Enter your email"
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-500">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="phone"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuPhone className="w-4 h-4" /> Phone Number
//                 </label>
//                 <input
//                   id="phone"
//                   {...register("phone", {
//                     required: "Phone number is required",
//                   })}
//                   placeholder="Enter your phone number"
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.phone && (
//                   <p className="text-sm text-red-500">{errors.phone.message}</p>
//                 )}
//               </div>

//               {/* CNIC */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="cnicNumber"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuCreditCard className="w-4 h-4" /> CNIC Number
//                 </label>
//                 <input
//                   id="cnicNumber"
//                   {...register("cnicNumber", { required: "CNIC is required" })}
//                   placeholder="Enter your CNIC number"
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.cnicNumber && (
//                   <p className="text-sm text-red-500">
//                     {errors.cnicNumber.message}
//                   </p>
//                 )}
//               </div>

//               {/* Gender */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <LuUser className="w-4 h-4" /> Gender
//                 </label>
//                 <select
//                   {...register("gender", { required: "Gender is required" })}
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                   onChange={(e) => setValue("gender", e.target.value)}
//                 >
//                   <option value="">Select your gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="text-sm text-red-500">
//                     {errors.gender.message}
//                   </p>
//                 )}
//               </div>

//               {/* Residence Area */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="residenceArea"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuMapPin className="w-4 h-4" /> Residence Area
//                 </label>
//                 <input
//                   id="residenceArea"
//                   {...register("residenceArea", {
//                     required: "Residence area is required",
//                   })}
//                   placeholder="Enter your residence area"
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.residenceArea && (
//                   <p className="text-sm text-red-500">
//                     {errors.residenceArea.message}
//                   </p>
//                 )}
//               </div>

//               {/* License */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="licenceNumber"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuFileText className="w-4 h-4" /> License Number
//                 </label>
//                 <input
//                   id="licenceNumber"
//                   {...register("licenceNumber", {
//                     required: "License number is required",
//                   })}
//                   placeholder="Enter your license number"
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.licenceNumber && (
//                   <p className="text-sm text-red-500">
//                     {errors.licenceNumber.message}
//                   </p>
//                 )}
//               </div>

//               {/* DOB */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="dateOfBirth"
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700"
//                 >
//                   <LuCalendarDays className="w-4 h-4" /> Date of Birth
//                 </label>
//                 <input
//                   id="dateOfBirth"
//                   type="date"
//                   {...register("dateOfBirth", {
//                     required: "Date of birth is required",
//                   })}
//                   className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 {errors.dateOfBirth && (
//                   <p className="text-sm text-red-500">
//                     {errors.dateOfBirth.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full cursor-pointer hover:opacity-90 text-blue-900 font-semibold py-2 rounded-md shadow-md border border-blue-900 transition hover:shadow-blue-800"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Registration"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverOnboarding;

// import React from "react";
// import DriverOnHold from "../component/DriverOnHold";

// const DriverOnboarding = () => {
//   return (
//     <div className="p-4">
//       <div className="flex flex-row justify-between items-center">
//         <h1 className="text-lg font-bold mb-4">Driver Verification</h1>
//       </div>
//       <div className="flex gap-4 overflow-x-auto py-2 mb-3">
//         <DriverOnHold />
//       </div>
//     </div>
//   );
// };

// export default DriverOnboarding;

// ============================

// "use client";
// import React, { useState } from "react";
// import { addNewDriver, Driver } from "@/app/apiFolder/driver";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthProvider";

// const AddDriverForm = () => {
//   const router = useRouter();
//   const { user } = useAuth();

//   const [formData, setFormData] = useState<Partial<Driver>>({
//     adminId: "",
//     parentReference: "",
//     referenceNumber: "",
//     name: "",
//     email: "",
//     password: "",
//     contactNumber: "",
//     cnicNumber: "",
//     gender: "",
//     residenceArea: "",
//     licenseNumber: "",
//     dateOfBirth: "",
//   });

//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user) return;

//     const driverAdd = {

//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),

//       adminId: user.id,
//   name: formData.name,
//   contactNumber: formData.phone,
//   email: formData.email,
//   password: formData.,
//   cnicNumber: formData.cnicNumber,
//   gender: formData.gender,
//   dateOfBirth: formData.gender,
//   parentReference: formData.,
//   licenseNumber: formData.licenseNumber,
//   referenceNumber: formData.,
//   residenceArea: formData.residenceArea,
//     };

//     console.log("🆕 New Driver:", driverAdd);

//     try {
//       const newDriver = await addNewDriver(driverAdd);
//       console.log("✅ Driver Added:", newDriver);
//       router.push("/driver");
//     } catch (err) {
//       console.error("❌ Error adding driver:", err);
//       setError("Error adding driver. Try again later.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-md rounded-lg p-4 space-y-4 max-w-2xl"
//       // className="bg-white shadow-md rounded-lg p-4 space-y-4 "
//     >
//       <h2 className="text-xl font-semibold mb-2">Add New Driver</h2>

//       <div className="flex w-full space-x-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="Full Name"
//             required
//           />
//         </div>

//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-1">
//             Contact Number
//           </label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="03XX-XXXXXXX"
//             required
//           />
//         </div>
//       </div>

//       <div className="flex w-full space-x-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="example@email.com"
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="Enter password"
//             required
//           />
//         </div>
//       </div>

//       <div className="flex w-full space-x-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium">CNIC Number</label>
//           <input
//             type="text"
//             name="cnicNumber"
//             value={formData.cnicNumber}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="XXXXX-XXXXXXX-X"
//             required
//           />
//         </div>

//         <div className="flex-1">
//           <label className="block text-sm font-medium">Gender</label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="border rounded p-2.5 w-full bg-white"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium">Date of Birth</label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//           />
//         </div>
//       </div>

//       <div className="flex w-full space-x-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium">Parent Reference</label>
//           <input
//             type="text"
//             name="parentReference"
//             value={formData.parentReference}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="Parent Reference Code"
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium">License Number</label>
//           <input
//             type="text"
//             name="licenseNumber"
//             value={formData.licenseNumber}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             placeholder="License Number"
//           />
//         </div>

//         <div className="flex-1">
//           <label className="block text-sm font-medium">Reference Number</label>
//           <div className="flex">
//             <input
//               type="text"
//               name="referenceNumber"
//               value={formData.referenceNumber}
//               onChange={handleChange}
//               className="border rounded p-2 w-full"
//               placeholder="e.g. DRV-1023"
//             />
//           </div>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Residence Area</label>
//         <input
//           type="text"
//           name="residenceArea"
//           value={formData.residenceArea}
//           onChange={handleChange}
//           className="border rounded p-2 w-full"
//           placeholder="e.g. Gulshan-e-Iqbal, Karachi"
//         />
//       </div>

//       <button
//         type="submit"
//         className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
//       >
//         Add Driver
//       </button>

//       {error && <p className="text-red-600 text-sm">{error}</p>}
//     </form>
//   );
// };

// export default AddDriverForm;

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
