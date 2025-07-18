import React from "react";
import PathComparisonMap from "../component/PathComparisonMap";

type PathComparisonPageProps = {
  params: { pathID: string };
};

const PathComparisonPage = ({
  params: { pathID },
}: PathComparisonPageProps) => {
  const startPoint = { lat: 24.8607, lng: 67.0011 }; // Karachi
  const dropoutPoints = [
    { place: "VSP Store", location: { lat: 24.86267, lng: 67.079995 } },
    {
      place: "North Karachi Warehouse",
      location: { lat: 24.98022, lng: 67.06467 },
    },
    { place: "DHA Drop Point", location: { lat: 24.81383, lng: 67.04345 } },
  ];
  const endPoint = { lat: 24.8963, lng: 67.0822 }; // Clifton
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Trip Route Map: {pathID}</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        <div className="relative w-full aspect-video rounded-xl shadow overflow-hidden">
          <PathComparisonMap
            startPoint={startPoint}
            dropoutPoints={dropoutPoints}
            endPoint={endPoint}
          />
        </div>
      </div>
    </div>
  );
};

export default PathComparisonPage;
