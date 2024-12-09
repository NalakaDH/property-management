import React from "react";
import PropertyForm from "../components/PropertyForm";
import { FaEdit } from "react-icons/fa";
import "../styles/UniquePageStyles.css";

const EditProperty = () => {
    return (
        <div className="page-container">
            <h2><FaEdit style={{ marginRight: "10px" }} /> Edit Property</h2>
            <div className="page-card">
                <PropertyForm />
            </div>
        </div>
    );
};

export default EditProperty;
