import React from "react";
import PathComparisonMap from "../../path-comparison/component/PathComparisonMap";

const PathComparisonPage = () => {
  const startPoint = { lat: 31.5204, lng: 74.3587 }; // Lahore
  const dropoutPoints = [
    { lat: 31.5225, lng: 74.36 },
    { lat: 31.525, lng: 74.3615 },
  ];
  const endPoint = { lat: 31.5305, lng: 74.3632 };
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Trip Route Map</h1>

      <div className="relative w-full aspect-video rounded-xl shadow overflow-hidden">
        <PathComparisonMap
          startPoint={startPoint}
          dropoutPoints={dropoutPoints}
          endPoint={endPoint}
        />
      </div>
    </div>
  );
};

export default PathComparisonPage;
