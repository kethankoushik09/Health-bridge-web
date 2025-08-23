import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar.jsx";
import DocPage from "./pages/AllDoctors/Doctors.jsx";
import Home from "./pages/Home/home.jsx";

export default function App() {
  return (
    <div>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-doctors" element={<DocPage />} />
      </Routes>
    </div>
  );
}
