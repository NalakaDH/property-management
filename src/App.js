import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import PropertyDetails from "./components/PropertyDetails";
import LandingPage from "./pages/LandingPage"; // New Landing Page
import "leaflet/dist/leaflet.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} /> {/* New Homepage */}
                <Route path="/list" element={<Home />} />
                <Route path="/add" element={<AddProperty />} />
                <Route path="/edit/:id" element={<EditProperty />} />
                <Route path="/details/:id" element={<PropertyDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
