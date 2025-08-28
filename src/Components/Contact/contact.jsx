import React from "react";
import contact from "../../assets/contact.png";

const ContactPage = () => {
  return (
    <div className=" bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Image */}
        <div>
          <img
            src={contact}
            alt="Contact Us"
            className="shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Contact Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-sm font-medium mb-2">📧 info@kswellness.com</p>
          <p className="text-sm font-medium mb-2">📞 +91 98765 43210</p>
          <p className="text-sm font-medium">
            🏥 KS Wellness, 123 Green Valley Road,  
            Near City Hospital, Hyderabad, Telangana, 500001
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
