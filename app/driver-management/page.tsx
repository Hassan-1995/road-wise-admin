import RegisterDriver from "./component/RegisterDriver";
import { Driver, User } from "@prisma/client";

type DriverWithUser = Driver & {
  user: Pick<User, "name" | "email" | "phone">;
};

const DriverManagement = async () => {
  let drivers: DriverWithUser[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/driver", {
      cache: "no-store", // Ensures fresh data every request
    });
    drivers = await res.json();
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }

  const formattedDrivers = drivers.map((d) => ({
    id: d.id,
    name: d.user.name,
    gender: d.gender,
    phone: d.user.phone,
    email: d.user.email,
    cnic: d.cnicNumber,
    residence: d.residenceArea,
    dob: d.dateOfBirth,
  }));

  console.log(drivers);
  console.log("Data:", formattedDrivers);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Drivers</h1>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <RegisterDriver drivers={formattedDrivers} />
      </div>
    </div>
  );
};

export default DriverManagement;
