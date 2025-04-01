import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import locationMarker from "../../assets/locationmarker.png"

const CustomMarkerIcon = L.icon({
    iconUrl: locationMarker, // Replace with your icon path
    iconSize: [32, 32], // Adjust size as needed
    iconAnchor: [16, 32], // Point where the icon is anchored
    popupAnchor: [0, -32], // Position for popups if used
});

const MapPreview = ({ lat, lng }) => {
    const zoomLevel = 16; // Adjusted to show ~500m radius

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={zoomLevel}
            style={{ width: "300px", height: "300px", borderRadius: "8px", overflow: "hidden" }}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={CustomMarkerIcon} />
        </MapContainer>
    );
};

export default MapPreview;