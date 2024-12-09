import React from "react";
import PropertyList from "../components/PropertyList";
import { FaHome } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import "../styles/UniquePageStyles.css";

const Home = () => {
    return (
        <div className="page-container">
            <h1><FaHome style={{ marginRight: "10px" }} /> Welcome to Property Management</h1>
            <div className="page-card">
                <PropertyList />
            </div>
            <a href="/add" className="primary-button">
                <FaPlusCircle style={{ marginRight: "10px" }} /> Add New Property
            </a>
        </div>
    );
};

export default Home;
