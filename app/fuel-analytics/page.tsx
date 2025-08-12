import FuelLogTable from "./component/FuelLogTable";

const AnalyticsPage = async () => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Fuel & Cost Analytics</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        <FuelLogTable />
      </div>
    </div>
  );
};

export default AnalyticsPage;
