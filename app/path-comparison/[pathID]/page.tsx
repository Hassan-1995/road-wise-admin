// app/two-polylines/page.tsx
import React from "react";
import PathComparisonMap from "../../components/PathComparisonMap";
import { LatLngExpression } from "leaflet";
import { getOptimisedPathByTripId } from "@/app/apiFolder/path";

// -- decoded fnuction
type LatLng = { lat: number; lng: number };

function decodePolyline(encoded: string): LatLngExpression[] {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates: LatLngExpression[] = [];

  while (index < encoded.length) {
    let b: number;
    let shift = 0;
    let result = 0;

    // latitude
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    // longitude
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push([lat / 1e5, lng / 1e5]);
  }

  return coordinates;
}

const TwoPolylinePage = async () => {
  // Example coordinates
  const polyline1: LatLngExpression[] = [
    [37.7749, -122.4194],
    [37.775, -122.418],
    [37.776, -122.417],
  ];

  const polyline2: LatLngExpression[] = [
    [37.774, -122.42],
    [37.7755, -122.419],
    [37.777, -122.418],
  ];

  let decodedOptimisedPath: LatLngExpression[] = [];

  try {
    const res = await getOptimisedPathByTripId(31);

    console.log("Res: ", res.data.optimisedPath);

    if (!res || !res.data.optimisedPath) {
      throw new Error("No optimised path returned from API");
    }

    decodedOptimisedPath = decodePolyline(res.data.optimisedPath);
    console.log("Decoded Path: ", decodedOptimisedPath);
  } catch (error) {
    console.error("Error fetching or decoding polyline:", error);
    // fallback or empty polyline so your map still renders
    decodedOptimisedPath = [];
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Two Polylines Map</h1>
      {/* <PathComparisonMap polyline1={polyline1} polyline2={polyline2} /> */}
      <PathComparisonMap
        polyline1={decodedOptimisedPath}
        polyline2={decodedOptimisedPath}
      />
    </div>
  );
};

export default TwoPolylinePage;
