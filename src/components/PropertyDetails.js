import React, { useState, useEffect } from "react";
import { fetchProperties } from "../services/api"; // Fetch all properties
import { useNavigate } from "react-router-dom"; // Navigate back to Home
import "../styles/PropertyDetails.css";

const PropertyDetails = () => {
    const [properties, setProperties] = useState([]); // Store all properties
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        fetchProperties()
            .then((response) => {
                setProperties(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching property details");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (properties.length === 0) {
        return <p>No properties found.</p>;
    }

    return (
        <div className="property-details-page">
            <h1 className="page-title">Property Details</h1>
            <div className="properties-container">
                {properties.map((property) => (
                    <div className="property-details-container" key={property.id}>
                        <h2>{property.title}</h2>
                       
                        <p><strong>Type:</strong> {property.type}</p>
                        <p><strong>Purpose:</strong> {property.purpose}</p>
                        <p><strong>Price:</strong> ${property.price}</p>
                        <p><strong>Status:</strong> {property.status}</p>
                        <p><strong>Address:</strong> {property.address}</p>
                        <p><strong>Description:</strong> {property.description}</p>
                    </div>
                ))}
            </div>
            <button className="home-button" onClick={() => navigate("/")}>
                Go to Home
            </button>
        </div>
    );
};

export default PropertyDetails;
