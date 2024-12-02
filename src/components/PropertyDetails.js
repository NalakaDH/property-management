import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById } from "../services/api";
import "../styles/PropertyDetails.css";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({
        title: "",
        type: "",
        purpose: "",
        price: "",
        status: "",
        description: "",
    });

    useEffect(() => {
        fetchPropertyById(id).then((response) => setProperty(response.data));
    }, [id]);

    return (
        <div className="property-details-container">
            <h2>{property.title}</h2>
            
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Purpose:</strong> {property.purpose}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Status:</strong> {property.status}</p>
            <p><strong>Description:</strong> {property.description}</p>
        </div>
    );
};

export default PropertyDetails;
