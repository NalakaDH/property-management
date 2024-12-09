import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../styles/SelectLocation.css";

const SelectLocation = () => {
    const navigate = useNavigate();
    const locationState = useLocation();
    const [selectedLocation, setSelectedLocation] = useState(
        locationState.state?.location || { lat: 51.505, lng: -0.09 } // Default location
    );
    const [address, setAddress] = useState("");

    // Reverse Geocoding to fetch address
    const fetchAddress = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const address = response.data.display_name || "Unknown location";
            setAddress(address);
        } catch (error) {
            console.error("Failed to fetch address:", error);
            setAddress("Failed to fetch address. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAddress(selectedLocation.lat, selectedLocation.lng);
    }, [selectedLocation]);

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setSelectedLocation({ lat, lng });
                fetchAddress(lat, lng); // Update address when clicked
                map.flyTo(e.latlng, map.getZoom());
            },
        });

        return (
            <Marker
                position={[selectedLocation.lat, selectedLocation.lng]}
                draggable={true}
                eventHandlers={{
                    dragend: (event) => {
                        const newPosition = event.target.getLatLng();
                        setSelectedLocation({ lat: newPosition.lat, lng: newPosition.lng });
                        fetchAddress(newPosition.lat, newPosition.lng); // Update address when dragged
                    },
                }}
            >
                <Popup>
                    <span>Drag to change location</span>
                </Popup>
            </Marker>
        );
    };

    const SearchBar = () => {
        const map = useMap();
        useEffect(() => {
            const provider = new OpenStreetMapProvider();
            const searchControl = new GeoSearchControl({
                provider,
                style: "bar",
                showMarker: false,
                autoClose: true,
            });

            map.addControl(searchControl);

            map.on("geosearch/showlocation", (result) => {
                const { x: lng, y: lat, label } = result.location;
                setSelectedLocation({ lat, lng });
                setAddress(label); // Update address from search
                map.flyTo([lat, lng], 13);
            });

            return () => map.removeControl(searchControl);
        }, [map]);

        return null;
    };

    const handleConfirm = () => {
        console.log("Navigating back with state:", { location: selectedLocation, address });
        navigate(-1, { state: { location: selectedLocation, address } });
    };

    return (
        <div className="select-location-page">
            <h2>Select Location</h2>
            <MapContainer
                center={[selectedLocation.lat, selectedLocation.lng]}
                zoom={13}
                style={{ height: "80vh", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <SearchBar />
                <LocationMarker />
            </MapContainer>
            <div className="location-details">
                <p><strong>Address:</strong> {address}</p>
                <button className="confirm-button" onClick={handleConfirm}>
                    Confirm Location
                </button>
            </div>
        </div>
    );
};

export default SelectLocation;
