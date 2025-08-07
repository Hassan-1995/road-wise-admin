import { Driver, User } from "@prisma/client";
import React from "react";
import Drivers from "./component/Drivers";

// type DriverWithUser = Driver & {
//   user: Pick<User, "name" | "email" | "phone">;
// };

const DriverTips = async () => {
  // let drivers: DriverWithUser[] = [];

  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/driver`, {
  //     cache: "no-store", // Ensures fresh data every request
  //   });
  //   drivers = await res.json();
  // } catch (error) {
  //   console.error("Error fetching drivers:", error);
  // }

  // const formattedDrivers = drivers.map((d) => ({
  //   id: d.id,
  //   name: d.user.name,
  //   gender: d.gender,
  //   phone: d.user.phone,
  //   email: d.user.email,
  //   cnic: d.cnicNumber,
  //   residence: d.residenceArea,
  //   dob: d.dateOfBirth,
  // }));

  // console.log(drivers);
  // console.log("Data:", formattedDrivers);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Trips and Delivery Logs</h1>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        {/* <Drivers drivers={formattedDrivers} /> */}
        <Drivers />
      </div>
    </div>
  );
};

export default DriverTips;
