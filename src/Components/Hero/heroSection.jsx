// src/components/Hero.jsx
import React from "react";
import heroImage from "../../assets/hero.png"; // replace with your hero image path

function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[70vh] lg:h-[85vh] bg-white">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Medical Hero"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />

      {/* Overlay content on left */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-lg px-4 sm:px-6 md:px-10 ml-0 md:ml-10 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-6">
            Book appointments with top doctors anytime, anywhere.
          </p>
          <button className="btn btn-info btn-md sm:btn-lg">Book Appointment</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
