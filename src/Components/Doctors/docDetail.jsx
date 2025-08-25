import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = useSelector((state) =>
    state.doctors.list.find((doc) => doc.id === parseInt(id))
  );

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timings = {
    Monday: "8:00am - 9:00pm",
    Tuesday: "8:00am - 9:00pm",
    Wednesday: "8:00am - 9:00pm",
    Thursday: "8:00am - 9:00pm",
    Friday: "8:00am - 7:00pm",
  };

  const slots = {
    Monday: ["9:00am", "10:30am", "1:00pm", "3:30pm", "6:00pm"],
    Tuesday: ["9:15am", "11:00am", "2:00pm", "4:00pm", "7:30pm"],
    Wednesday: ["8:30am", "10:00am", "12:30pm", "5:00pm", "8:30pm"],
    Thursday: ["9:45am", "11:30am", "2:15pm", "4:45pm", "6:30pm"],
    Friday: ["9:00am", "10:45am", "1:15pm", "3:45pm", "5:30pm"],
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot before booking!");
      return;
    }
    alert(
      `✅ Appointment booked with ${doctor.name} on ${selectedDay} at ${selectedSlot}`
    );
  };

  if (!doctor) {
    return <p className="text-center mt-10 text-red-500">Doctor not found</p>;
  }

  return (
    <div className="w-full min-h-screen py-10 px-5 sm:px-10 lg:px-20 bg-gray-50">
      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-12">
        {/* Left - Image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="rounded-xl border-4 border-white shadow-lg w-[290px] h-[250px] object-cover"
          />
        </div>

        {/* Right - Details */}
        <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-600">{doctor.name}</h2>
          <p className="text-gray-600 text-lg mb-2">{doctor.specialization}</p>
          <p className="text-gray-500 mb-2">Experience: 4+ years</p>
          <p className="text-gray-700 mb-4">
            {doctor.name} is an experienced {doctor.specialization} dedicated
            to providing the highest level of patient care and treatment.
          </p>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Appointment Fee: <span className="text-green-600">₹500</span>
          </p>
        </div>
      </div>

      {/* Timings */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Day</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.keys(timings).map((day) => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setSelectedSlot(null); // reset slot when day changes
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedDay === day
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <p className="text-gray-600 mb-4">
          Opening Hours: {timings[selectedDay]}
        </p>

        {/* Slots */}
        <div className="flex flex-wrap gap-3 mb-6">
          {slots[selectedDay].map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlot(slot)}
              className={`px-4 py-2 border rounded-lg ${
                selectedSlot === slot
                  ? "bg-blue-500 text-white border-blue-600"
                  : "border-blue-400 hover:bg-blue-100"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
