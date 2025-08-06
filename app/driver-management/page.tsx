import Drivers from "./component/Drivers";

const DriverManagement = async () => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Drivers</h1>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <Drivers />
      </div>
    </div>
  );
};

export default DriverManagement;
