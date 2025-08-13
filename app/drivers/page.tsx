import Link from "next/link";
import Drivers from "./component/Drivers";

const DriversPage = async () => {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-bold mb-4">Drivers</h1>
        <Link
          href={"/drivers/add-driver"}
          className="text-blue-900 font-semibold rounded-xl hover:underline underline-offset-[5px] mr-10"
        >
          {" "}
          Add Driver
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <Drivers />
      </div>
    </div>
  );
};

export default DriversPage;
