"use client";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import React from "react";

// Fix default marker icon issue in Next.js + Leaflet
if ("_getIconUrl" in (L.Icon.Default.prototype as object)) {
  delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type TwoPolylineMapProps = {
  polyline1: LatLngExpression[];
  polyline2: LatLngExpression[];
};

const TwoPolylineMap = ({ polyline1, polyline2 }: TwoPolylineMapProps) => {
  // Center map on the first point of polyline1
  const center: LatLngExpression = polyline1.length > 0 ? polyline1[0] : [0, 0];

  

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* First polyline - red */}
        <Polyline positions={polyline1} color="red" weight={4} />

        {/* Second polyline - blue */}
        <Polyline positions={polyline2} color="blue" weight={4} />
      </MapContainer>
    </div>
  );
};

export default TwoPolylineMap;
