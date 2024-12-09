import React, { useEffect, useState } from "react";
import { fetchProperties, deleteProperty } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/PropertyList.css";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
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
                setError("Failed to load properties. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            deleteProperty(id)
                .then(() => {
                    setProperties((prev) => prev.filter((property) => property.id !== id));
                })
                .catch(() => {
                    alert("Failed to delete the property. Please try again.");
                });
        }
    };

    if (loading) return <p>Loading properties...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="property-list-container">
            <h2>Property List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id}>
                            <td>{property.title}</td>
                            <td>{property.type}</td>
                            <td>${property.price}</td>
                            <td>{property.purpose}</td>
                            <td>{property.status}</td>
                            <td>{property.address}</td>
                            <td>{property.description}</td>
                            <td className="actions">
                                <Link to={`/list${property.id}`}>
                                    <FaEye /> View
                                </Link>
                                <Link to={`/edit/${property.id}`}>
                                    <FaEdit /> Edit
                                </Link>
                                <button onClick={() => handleDelete(property.id)}>
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button className="home-button" onClick={() => navigate("/")}>
                Go to Home
            </button>
        </div>
    );
};

export default PropertyList;
