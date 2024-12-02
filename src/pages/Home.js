import React from "react";
import PropertyList from "../components/PropertyList";

const Home = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to Property Management</h1>
            <PropertyList />
        </div>
    );
};

export default Home;
