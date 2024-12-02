import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPropertyById, createProperty, updateProperty } from "../services/api";

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        purpose: "",
        price: "",
        status: "",
        description: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPropertyById(id).then((response) => setFormData(response.data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = id ? updateProperty(id, formData) : createProperty(formData);
        apiCall.then(() => navigate("/"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" required />
            <input name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Purpose" required />
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <button type="submit">{id ? "Update Property" : "Add Property"}</button>
        </form>
    );
};

export default PropertyForm;
