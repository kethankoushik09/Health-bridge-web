// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useSelector } from "react-redux";
import { User, CalendarCheck, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constant.js";
import { removeUser, setUser } from "../../Redux/User/userSlice.js";
import { toast } from "react-toastify";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLogin, data } = useSelector((state) => state.user);
  //  const isLogin=true;

  const navigate = useNavigate();

  async function FetchUserdata() {
    console.log("fetch user");

    try {
      const res = await axios.get(BASE_URL + "/api/user/getProfile", {
        withCredentials: true,
      });
      console.log(res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    if (!data) {
      FetchUserdata();
    }
  }, []);

  async function handleLogout() {
    try {
      const res = await axios.post(
        BASE_URL + "/api/user/logout",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(removeUser());
        navigate("/");

        toast.success(res.data.message);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="navbar bg-white shadow-md px-6 sticky top-0 z-50">
      {/* Left: Logo & Name */}
      <div className="flex-1">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="KS Wellness Logo" className="h-8 w-9" />
          <span className="text-xl font-bold text-black">KS Wellness</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1 text-black font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-doctors">All Doctors</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Desktop Buttons */}
      {isLogin ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={data.image} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-2xl z-10 mt-3 w-56 p-2 shadow-lg border border-gray-100"
          >
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <User className="w-5 h-5 text-blue-600" />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <CalendarCheck className="w-5 h-5 text-blue-600" />
                Appointments
              </Link>
            </li>

            <li>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition w-full text-left"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="text-red-600">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://wellness-admin-alpha.vercel.app/login"
            target="_blank"
            className="btn btn-sm btn-outline btn-primary"
          >
            Admin Panel
          </a>

          <Link to="/register">
            <button className="btn btn-sm btn-primary">Create Account</button>
          </Link>
        </div>
      )}

      {/* Mobile Hamburger */}
      <div className="lg:hidden flex-none">
        <button className="btn btn-ghost" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Full-Width Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50">
          <ul className="flex flex-col space-y-4 p-4 text-black font-medium">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-doctors" onClick={() => setIsOpen(false)}>
                All Doctors
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            {!isLogin && (<>
             <li>
              <a
            href="https://wellness-admin-alpha.vercel.app/login"
            target="_blank"
            className="btn btn-sm btn-outline btn-primary"
          >
            Admin Panel
          </a>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="btn btn-sm btn-primary w-full">
                  Create Account
                </button>
              </Link>
            </li>
            </>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
