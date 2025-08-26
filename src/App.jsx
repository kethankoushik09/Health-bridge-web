import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar.jsx";
import DocPage from "./pages/AllDoctors/Doctors.jsx";
import LoginForm from "./Components/Login/login.jsx";
// import DoctorProfile
import Home from "./pages/Home/home.jsx";
import { ToastContainer } from "react-toastify";

export default function App() {

  return (
    <div>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-doctors" element={<DocPage />} />
        <Route path="/register" element={<LoginForm />} />
        {/* <Route path="/appointment/:id" element={<DoctorProfile />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
      <ToastContainer autoClose={500} />
    </div>
  );
}
