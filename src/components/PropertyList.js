import React, { useEffect, useState } from "react";
import { fetchProperties, deleteProperty } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/PropertyList.css";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        fetchProperties()
            .then(({ data }) => {
                setProperties(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load properties.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            deleteProperty(id)
                .then(() => setProperties((prev) => prev.filter((property) => property.id !== id)))
                .catch(() => alert("Failed to delete the property."));
        }
    };

    return (
        <div className="property-list-container">
            <h2>Property List</h2>
            <Link to="/add" className="add-button">Add New Property</Link>
            <table className="property-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Purpose</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(({ id, title, purpose, type, price, status, description }) => (
                        <tr key={id}>
                            <td>{title}</td>
                            <td>{type}</td>
                            <td>{purpose}</td>
                            <td>${price}</td>
                            <td>{status}</td>
                            <td>{description}</td>
                            <td className="property-actions">
                                <Link to={`/details/${id}`}>View</Link>
                                <Link to={`/edit/${id}`}>Edit</Link>
                                <button onClick={() => handleDelete(id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyList;
