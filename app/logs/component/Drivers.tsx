// import Link from "next/link";
// import React from "react";
// import { MdFemale, MdMale } from "react-icons/md";

// type DriversProps = {
//   drivers: {
//     id: number;
//     name: string;
//     gender: "Male" | "Female" | null;
//     phone: string | null;
//     email: string | null;
//     cnic: string;
//     residence: string | null;
//     dob: Date | null;
//   }[];
// };

// const Drivers = ({ drivers }: DriversProps) => {
//   const getGenderIcon = (gender: string | null) => {
//     switch (gender) {
//       case "Male":
//         return <MdMale className="text-blue-500 w-5 h-5" />;
//       case "Female":
//         return <MdFemale className="text-pink-500 w-5 h-5" />;

//       default:
//         return <h1>N/A</h1>;
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
//         <div className="w-1/8 p-3">Name</div>
//         <div className="w-1/12 p-3">Gender</div>
//         <div className="w-1/8 p-3">Phone</div>
//         <div className="w-2/10 p-3">Email</div>
//         <div className="w-1/8 p-3">CNIC Number</div>
//         <div className="w-1/4 p-3">Residence</div>
//         <div className="w-1/8 p-3">DoB</div>
//       </div>

//       {drivers.map((driver) => (
//         <Link
//           href={`/logs/${driver.id}`}
//           key={driver.id}
//           className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
//         >
//           {/* Driver Name */}
//           <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">Driver Name: </span>
//             {driver.name}
//           </div>

//           {/* Driver Gender */}
//           <div className="flex lg:block justify-between lg:w-1/12 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">Gender: </span>
//             {getGenderIcon(driver.gender)}
//           </div>

//           {/* Driver Phone */}
//           <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">Contact: </span>
//             {driver.phone}
//           </div>

//           {/* Driver Email */}
//           <div className="flex lg:block justify-between lg:w-2/10 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">Email: </span>
//             {driver.email}
//           </div>

//           {/* Driver CNIC */}
//           <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">CNIC:</span>
//             {driver.cnic}
//           </div>

//           {/* Driver Residence */}
//           <div className="flex lg:block justify-between lg:w-1/4 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">Residence:</span>
//             {driver.residence}
//           </div>

//           {/* Driver DoB */}
//           <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
//             <span className="lg:hidden font-medium">DoB:</span>
//             {driver.dob ? new Date(driver.dob).toLocaleDateString() : ""}
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Drivers;

"use client";
import { Driver, getAllDriversInfo } from "@/app/apiFolder/driver";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdFemale, MdMale } from "react-icons/md";

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllDriversInfo();
        setDrivers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const getGenderIcon = (gender: string | null) => {
    switch (gender) {
      case "Male":
        return <MdMale className="text-blue-500 w-5 h-5" />;
      case "Female":
        return <MdFemale className="text-pink-500 w-5 h-5" />;

      default:
        return <h1>N/A</h1>;
    }
  };
  if (loading) return <p className="p-4 text-gray-600">Loading drivers...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden lg:flex w-full bg-gray-100 border-b border-zinc-300 font-semibold text-sm">
        <div className="w-1/8 p-3">Name</div>
        <div className="w-1/12 p-3">Gender</div>
        <div className="w-1/8 p-3">Phone</div>
        <div className="w-2/10 p-3">Email</div>
        <div className="w-1/8 p-3">CNIC Number</div>
        <div className="w-1/4 p-3">Residence</div>
        <div className="w-1/8 p-3">DoB</div>
      </div>

      {drivers.map((driver) => (
        <Link
          href={`/logs/${driver.id}`}
          key={driver.id}
          className="w-full flex flex-col lg:flex-row border-b border-zinc-200 hover:bg-gray-50 transition-colors"
        >
          {/* Driver Name */}
          <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Driver Name: </span>
            {driver.name}
          </div>

          {/* Driver Gender */}
          <div className="flex lg:block justify-between lg:w-1/12 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Gender: </span>
            {getGenderIcon(driver.gender)}
          </div>

          {/* Driver Phone */}
          <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Contact: </span>
            {driver.phone}
          </div>

          {/* Driver Email */}
          <div className="flex lg:block justify-between lg:w-2/10 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Email: </span>
            {driver.email}
          </div>

          {/* Driver CNIC */}
          <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">CNIC:</span>
            {driver.cnicNumber}
          </div>

          {/* Driver Residence */}
          <div className="flex lg:block justify-between lg:w-1/4 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">Residence:</span>
            {driver.residenceArea}
          </div>

          {/* Driver DoB */}
          <div className="flex lg:block justify-between lg:w-1/8 p-3 text-sm text-gray-700">
            <span className="lg:hidden font-medium">DoB:</span>
            {driver.dateOfBirth
              ? new Date(driver.dateOfBirth).toLocaleDateString()
              : ""}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Drivers;
