import React from "react";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
       <footer className="bg-gray-100 text-gray-900 px-8 py-12 mt-10">

      <div className="flex flex-col md:flex-row justify-around items-start gap-10">
        {/* Left Part - Logo & About */}
        <div className="md:w-1/2 space-y-3 lg:px-28 ">
          <div className="flex items-center gap-3">
            <img src={logo} alt="KS Logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-2xl font-bold text-blue-900">KS Wellness</h2>
          </div>
          <p className="text-sm  leading-relaxed font-medium">
            KS Wellness is committed to providing top-notch healthcare services
            with experienced doctors across various departments. Your health is
            our priority. We focus on delivering personalized care with a blend
            of modern medical technology and compassionate service. Our aim is
            to ensure holistic wellness, addressing not just immediate concerns
            but also guiding you towards a healthier lifestyle.
          </p>
        </div>

        {/* Right Part - Timings & Contact */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Timings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-900">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <span className="font-semibold">Monday:</span> 8:00am - 9:00pm
              </li>
              <li>
                <span className="font-semibold">Tuesday:</span> 8:00am - 9:00pm
              </li>
              <li>
                <span className="font-semibold">Wednesday:</span> 8:00am -
                9:00pm
              </li>
              <li>
                <span className="font-semibold">Thursday:</span> 8:00am - 9:00pm
              </li>
              <li>
                <span className="font-semibold">Friday:</span> 8:00am - 7:00pm
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-900">
              Contact
            </h3>
            <p className="text-sm font-medium mb-2">📧 info@kswellness.com</p>
            <p className="text-sm font-medium">📞 +91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm font-medium">
        © {new Date().getFullYear()} KS Wellness. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
