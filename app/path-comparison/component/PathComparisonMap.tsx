"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = { lat: number; lng: number };
type DropoutLocation = { place: string; location: LatLng };
type Props = {
  startPoint: LatLng;
  dropoutPoints: DropoutLocation[];
  endPoint: LatLng;
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PathComparisonMap: React.FC<Props> = ({
  startPoint,
  dropoutPoints,
  endPoint,
}) => {
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const allPoints = [
          startPoint,
          ...dropoutPoints.map((d) => d.location),
          endPoint,
        ];
        const coords = allPoints.map((p) => [p.lng, p.lat]);

        const response = await fetch(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            method: "POST",
            headers: {
              Authorization: process.env.NEXT_PUBLIC_ORS_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              coordinates: coords,
              instructions: false,
            }),
          }
        );

        const data = await response.json();

        if (data && data.features && data.features[0]) {
          const coordinates = data.features[0].geometry.coordinates.map(
            ([lng, lat]: [number, number]) => ({ lat, lng })
          );
          setRouteCoords(coordinates);

          const summary = data.features[0].properties.summary;
          setDistance(summary.distance);
          setDuration(summary.duration);
        } else {
          console.error("ORS Error:", data);
        }
      } catch (error) {
        console.error("Error fetching ORS route:", error);
      }
    };

    fetchRoute();
  }, [startPoint, dropoutPoints, endPoint]);

  console.log("Route Cords: ", routeCoords);

  return (
    // <div className="w-full h-[500px] rounded-xl overflow-hidden shadow relative">
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[startPoint.lat, startPoint.lng]}
        zoom={10}
        className="w-full h-full"
        // style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer
          url="https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}

        <Marker position={startPoint} icon={greenIcon}>
          <Popup>Start Point</Popup>
        </Marker>

        {dropoutPoints.map((drop, idx) => (
          <Marker
            key={idx}
            position={{ lat: drop.location.lat, lng: drop.location.lng }}
          >
            <Popup>{drop.place}</Popup>
          </Marker>
        ))}

        <Marker position={endPoint} icon={redIcon}>
          <Popup>End Point</Popup>
        </Marker>

        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords}
            // color="#1565C0" weight={4}
            color="#0D47A1"
            weight={5}
            opacity={0.8}
          />
        )}
      </MapContainer>

      {distance !== null && duration !== null && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow text-center  z-[999]">
          <p className="text-sm font-medium text-gray-800">
            📍 Distance: {(distance / 1000).toFixed(2)} km
          </p>
          <p className="text-sm font-medium text-gray-800">
            ⏱️ ETA: {(duration / 60).toFixed(0)} min
          </p>
        </div>
      )}
    </div>
  );
};

export default PathComparisonMap;
