// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useSelector } from "react-redux";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggin = useSelector((state) => state.user);
  console.log(isLoggin?.image);

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
      {isLoggin ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={isLoggin.image}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-blue-600 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between hover:bg-blue-100">
                Profile
              </a>
            </li>
            <li>
              <a className="hover:bg-blue-100">Appointments</a>
            </li>
            <li>
              <a className="hover:bg-blue-100">Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/admin-panel"
            className="btn btn-sm btn-outline btn-primary"
          >
            Admin Panel
          </Link>
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
            <li>
              <Link to="/admin-panel" onClick={() => setIsOpen(false)}>
                Admin Panel
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="btn btn-sm btn-primary w-full">
                  Create Account
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
