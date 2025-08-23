import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FindBySpeciality() {
  const scrollRef = useRef(null);
  const specialties = useSelector((state) => state.speciality.list);

  return (
    <section className="py-10 bg-white">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Find by Speciality
      </h2>
      {/* Subheading */}
      <p className="text-center text-gray-600 mb-8">
        Choose from top medical specialists and book your appointment easily
      </p>

      <div className="relative flex items-center px-4 sm:px-6 lg:px-[60px]">
        {/* Scrollable Icons */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide w-full snap-x snap-mandatory px-10"
        >
          {specialties.map((spec, idx) => (
            <Link
              key={idx}
              to={spec.link}
              className="flex flex-col items-center min-w-[90px] lg:min-w-[150px] snap-start"
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
