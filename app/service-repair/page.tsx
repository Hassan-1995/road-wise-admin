import MaintenanceLogTable from "./component/MaintenanceLogTable";

const ServiceRepairPage = async () => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Service & Repair Log</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        <MaintenanceLogTable />
      </div>
    </div>
  );
};

export default ServiceRepairPage;
