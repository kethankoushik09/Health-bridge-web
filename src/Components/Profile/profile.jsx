import React, { useState } from "react";
import default1 from "../../assets/default1.png";
import { Mail, Phone, Home, User, Calendar } from "lucide-react";

function Profile() {
  const [user, setUser] = useState({
    image: default1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    address: "123, MG Road, Hyderabad, India",
    gender: "Male",
    dob: "1995-08-15",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-[91vh] bg-blue-50 py-12 px-4 sm:px-8 lg:px-16 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-xl">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {isEditing ? (
            <label htmlFor="fileInput" className="cursor-pointer">
              <img
                src={formData.image}
                alt={user.name}
                className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover hover:opacity-80 transition"
              />
            </label>
          ) : (
            <img
              src={user.image}
              alt={user.name}
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
            />
          )}

          {/* Hidden file input */}
          {isEditing && (
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          )}

          <h2 className="mt-3 text-xl font-bold text-blue-900">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded px-2 py-1 bg-white text-center"
              />
            ) : (
              user.name
            )}
          </h2>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-3 text-gray-700 text-l">
          <p className="flex items-center gap-2">
           <Mail className="w-5 h-5 text-blue-600" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded px-2 py-1 ml-2 bg-white"
              />
            ) : (
              user.email
            )}
          </p>
           <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded px-2 py-1 ml-2 bg-white"
              />
            ) : (
              user.phone
            )}
          </p>
           <p className="flex items-center gap-2">
            <Home className="w-5 h-5 text-orange-600" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded px-2 py-1 ml-2 w-2/3 bg-white"
              />
            ) : (
              user.address
            )}
          </p>
            <p className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded px-2 py-1 ml-2 bg-white"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              user.gender
            )}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-600" />
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border rounded px-2 py-1 ml-2 bg-white"
              />
            ) : (
              user.dob
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="btn btn-outline px-5 py-1.5 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-outline btn-primary px-5 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary px-5 py-1.5 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
