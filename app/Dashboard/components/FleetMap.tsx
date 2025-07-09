"use client";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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

const FleetMap = () => {
  const locations: { id: number; name: string; position: LatLngExpression }[] =
    [
      { id: 1, name: "Vehicle 1", position: [24.86267, 67.079995] },
      { id: 2, name: "Vehicle 2", position: [24.98022, 67.06467] },
      { id: 3, name: "Vehicle 3", position: [24.81383, 67.04345] },
    ];

  return (
    // <div className="w-full h-[500px] rounded-lg overflow-hidden">
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[24.8607, 67.0011]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.position}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FleetMap;
