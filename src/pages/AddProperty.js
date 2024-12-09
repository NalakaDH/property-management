import React from "react";
import PropertyForm from "../components/PropertyForm";
import { FaPlusCircle } from "react-icons/fa";
import "../styles/UniquePageStyles.css";

const AddProperty = () => {
    return (
        <div className="page-container">
            <h2><FaPlusCircle style={{ marginRight: "10px" }} /> Add New Property</h2>
            
            <div className="page-card">
                <PropertyForm />
            </div>
        </div>
    );
};

export default AddProperty;
