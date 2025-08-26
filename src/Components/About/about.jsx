import React from "react";
import {
  FaUserMd,
  FaHeartbeat,
  FaHospital,
  FaHandsHelping,
} from "react-icons/fa";
import hosImage from "../../assets/hos.png";

function About() {
  const features = [
    {
      icon: <FaUserMd className="text-blue-600 text-2xl" />,
      title: "Expert Doctors",
      desc: "Our team consists of highly qualified and experienced medical professionals.",
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-2xl" />,
      title: "Patient-Centered Care",
      desc: "We focus on providing compassionate and personalized care for every patient.",
    },
    {
      icon: <FaHospital className="text-green-600 text-2xl" />,
      title: "Modern Infrastructure",
      desc: "Equipped with the latest technology and facilities for world-class healthcare.",
    },
    {
      icon: <FaHandsHelping className="text-yellow-500 text-2xl" />,
      title: "24/7 Support",
      desc: "Our dedicated support team is available around the clock for assistance.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-20">
      {/* About Us Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-12">
        About Us
      </h2>

      {/* About Content */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        {/* Left - Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={hosImage}
            alt="Hospital"
            className="rounded-xl shadow-lg w-[90%] max-w-[500px] object-cover"
          />
        </div>

        {/* Right - Paragraph */}
        <div className="w-full lg:w-1/2 text-gray-700 leading-relaxed">
          <p className="text-lg mb-4">
            At <span className="font-semibold text-blue-700">KS Wellness</span>,
            we are committed to delivering comprehensive healthcare services
            with a strong focus on patient well-being.
          </p>
          <p className="text-lg mb-4">
            Our mission is to combine medical expertise with compassion,
            ensuring that every individual receives the best care possible in a
            safe and comfortable environment. With advanced facilities and a
            dedicated team, we aim to make quality healthcare accessible to all.
          </p>
          <p className="text-lg">
            We believe that good health is the foundation of a happy life. That’s
            why we provide personalized attention, holistic treatment plans, and
            continuous support throughout every patient’s journey. Our skilled
            doctors, nurses, and healthcare professionals deliver not only
            effective treatments but also emotional care that builds trust and
            confidence.
          </p>
        </div>
      </div>

      {/* What Makes Us Best Section */}
      <div className="card-body flex flex-col justify-center lg:w-3/4 w-full mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-9 text-center lg:text-left">
          What Makes Us Best?
        </h2>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white shadow-sm rounded-lg p-5 border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800 text-base">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
