"use client";

import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";

const LiveMapPositions = dynamic(() => import("./LiveMapPosition"), {
  ssr: false,
});

type LocationType = {
  id: number;
  name: string;
  position: LatLngExpression;
};

type WrapperLiveMapPositionProps = {
  locations: LocationType[];
};

const WrapperLiveMapPosition = ({ locations }: WrapperLiveMapPositionProps) => {
  return <LiveMapPositions locations={locations} />;
};

export default WrapperLiveMapPosition;
