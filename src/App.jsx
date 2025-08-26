import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar.jsx";
import DocPage from "./pages/AllDoctors/Doctors.jsx";
import LoginForm from "./Components/Login/login.jsx";
import Home from "./pages/Home/home.jsx";
import { ToastContainer } from "react-toastify";
import DoctorProfile from "./Components/Doctors/docDetail.jsx";
import AboutPage from "./pages/About/about.jsx";
import ProfilePage from "./pages/Profile/profile.jsx";
import MyAppointments from "./Components/Profile/myAppointments.jsx";

export default function App() {
  return (
    <div>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-doctors" element={<DocPage />} />
        <Route path="/register" element={<LoginForm/>} />
        <Route path="/appointment/:id" element={<DoctorProfile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<MyAppointments/>} />
      </Routes>
      <ToastContainer autoClose={500}/>
    </div>
  );
}
