import React from "react";
import { UserCheck, PhoneCall, Laptop, Building2 } from "lucide-react";
import doctorCutout from "../../assets/doctorCutout.png";

export default function WhatMakesUsBest() {
  const features = [
    {
      title: "Qualified Doctors",
      desc: "Our team consists of certified specialists in various fields.",
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Free Consultation",
      desc: "Get initial consultations at no cost with our experts.",
      icon: <PhoneCall className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Online Enrollment",
      desc: "Book your appointments easily through our digital platform.",
      icon: <Laptop className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Modern Facilities",
      desc: "We provide state-of-the-art infrastructure and equipment.",
      icon: <Building2 className="w-6 h-6 text-orange-600" />,
    },
  ];

  return (
    <div className="w-full flex justify-center my-10 px-4">
      <div className="card lg:card-side bg-blue-50 shadow-xl w-full lg:w-10/12 rounded-2xl overflow-hidden">
        {/* Left Side Doctor Image */}
        <figure className="flex justify-center items-center p-4 lg:w-1/3 w-full">
          <img
            src={doctorCutout}
            alt="Doctor"
            className="w-40 sm:w-56 lg:w-80 h-auto object-contain"
          />
        </figure>

        {/* Right Side Content */}
        <div className="card-body flex flex-col justify-center lg:w-2/3 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-9">
            What Makes Us Best?
          </h2>
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
