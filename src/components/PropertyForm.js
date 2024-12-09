import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPropertyById, createProperty, updateProperty } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../styles/PropertyForm.css";

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        purpose: "",
        price: "",
        status: "",
        description: "",
        location: { lat: 51.505, lng: -0.09 },
        address: "London, UK",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPropertyById(id).then((response) => setFormData(response.data));
        }
    }, [id]);

    const [address, setAddress] = useState(formData.address);

    const fetchAddress = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const address = response.data.display_name || "Unknown location";
            setAddress(address);
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Failed to fetch address");
        }
    };

    useEffect(() => {
        fetchAddress(formData.location.lat, formData.location.lng);
    }, [formData.location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithAddress = { ...formData, address };
        const apiCall = id ? updateProperty(id, formDataWithAddress) : createProperty(formDataWithAddress);
        apiCall
            .then(() => {
                // After successful add/update, navigate to PropertyList page
                navigate("/property-list");
            })
            .catch((error) => {
                console.error("Error adding/updating property:", error);
                alert("There was an error adding/updating the property.");
            });
    };

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setFormData((prev) => ({
                    ...prev,
                    location: { lat, lng },
                }));
                fetchAddress(lat, lng);
                map.flyTo(e.latlng, map.getZoom());
            },
        });

        return (
            <Marker position={[formData.location.lat, formData.location.lng]} draggable={true}>
                <Popup>
                    <span>Drag to set location</span>
                </Popup>
            </Marker>
        );
    };

    return (
        <div className="property-form-page">
            <div className="property-form-container">
                <h2>{id ? "Update Property" : "Add New Property"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                    />
                    <input
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Type"
                        required
                    />
                    <input
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="Purpose"
                        required
                    />
                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        placeholder="Status"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <div className="location-input-container">
                        <label>Select Location:</label>
                        <p>Latitude: {formData.location.lat}, Longitude: {formData.location.lng}</p>
                        <p>Address: {address || "No address selected"}</p>
                    </div>
                    <div className="map-container">
                        <MapContainer
                            center={[formData.location.lat, formData.location.lng]}
                            zoom={13}
                            style={{ height: "400px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>
                    <button type="submit">{id ? "Update Property" : "Add Property"}</button>
                </form>
                <button className="home-button" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default PropertyForm;
