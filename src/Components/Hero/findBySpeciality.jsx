// src/components/FindBySpeciality.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Import your speciality images
import gyno from "../../assets/gynocologist.jpg";
import dermo from "../../assets/dermo.png";
import gastro from "../../assets/gas.jpeg";
import general from "../../assets/generalDoc.png";
import neuro from "../../assets/neurologist.png";
import ped from "../../assets/pediatrician.png";

function FindBySpeciality() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -180 : 180, // scroll by width of one item
        behavior: "smooth",
      });
    }
  };

  const specialties = [
    { name: "Gynocologist", img: gyno, link: "/speciality/gyno" },
    { name: "Dermatologist", img: dermo, link: "/speciality/dermo" },
    { name: "Gastroenterologist", img: gastro, link: "/speciality/gastro" },
    { name: "General Doctor", img: general, link: "/speciality/general" },
    { name: "Neurologist", img: neuro, link: "/speciality/neuro" },
    { name: "Pediatrician", img: ped, link: "/speciality/ped" },
  ];

  return (
    <section className="py-10 bg-white">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Find by Speciality
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Scrollable Icons */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 lg:px-0 justify-center"
        >
          {specialties.map((spec, idx) => (
            <Link
              key={idx}
              to={spec.link}
              className="flex flex-col items-center min-w-[100px] lg:min-w-[150px]"
            >
              <img
                src={spec.img}
                alt={spec.name}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover mb-2 border-2 border-gray-200 hover:border-blue-500"
              />
              <span className="text-center text-black font-medium text-sm lg:text-base">
                {spec.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FindBySpeciality;
