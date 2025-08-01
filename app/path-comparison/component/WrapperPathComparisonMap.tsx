"use client";

// import { type LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";

const PathComparisonMap = dynamic(() => import("./PathComparisonMap"), {
  ssr: false,
});

// type LocationType = {
//   id: number;
//   name: string;
//   position: LatLngExpression;
// };

type LatLng = { lat: number; lng: number };
type DropoutLocation = { place: string; location: LatLng };

type WrapperPathComparisonMapProps = {
  startPoint: LatLng;
  dropoutPoints: DropoutLocation[];
  endPoint: LatLng;
};

const WrapperPathComparisonMap = ({
  startPoint,
  dropoutPoints,
  endPoint,
}: WrapperPathComparisonMapProps) => {
  return (
    <PathComparisonMap
      startPoint={startPoint}
      dropoutPoints={dropoutPoints}
      endPoint={endPoint}
    />
  );
};

export default WrapperPathComparisonMap;
