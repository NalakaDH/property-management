import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="overlay"></div>
            <div className="content">
                <h1>Welcome to Property Management</h1>
                <p>Manage properties with ease and elegance.</p>
                <div className="button-container">
                    <Link to="/details/:id" className="landing-button">
                        View Properties
                    </Link>
                    <Link to="/list" className="landing-button">
                        Add Property
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
