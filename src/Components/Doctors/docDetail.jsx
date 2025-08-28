import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addAppointment } from "../../Redux/Appointments/appointmentsSlice";
import { Link } from "react-router-dom";

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const doctors = useSelector((state) => state.doctors.list);

  const doctor = doctors.find((doc) => doc.id === parseInt(id));

  // Generate 7 days from today
  const today = new Date();
  const next7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      fullDate: d.toISOString().split("T")[0],
      label: `${d.getDate()} ${d.toLocaleDateString("en-US", {
        weekday: "short",
      })}`,
      weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    };
  });

  const [selectedDay, setSelectedDay] = useState(next7Days[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Generate slots between 10am - 8pm
  const generateSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 20; hour++) {
      for (let min = 0; min < 60; min += 30) {
        if (hour === 13) continue; // lunch break
        const time = new Date();
        time.setHours(hour, min, 0);
        slots.push(
          time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      }
    }
    return slots;
  };

  const slots = generateSlots();

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot before booking!");
      return;
    }

    const appointment = {
      id: Date.now(),
      doctor,
      day: selectedDay.weekday,
      date: selectedDay.fullDate,
      time: selectedSlot,
    };

    dispatch(addAppointment(appointment));
    alert(
      `✅ Appointment booked with ${doctor.name} on ${selectedDay.label} at ${selectedSlot}`
    );
  };

  if (!doctor) {
    return <p className="text-center mt-10 text-red-500">Doctor not found</p>;
  }

  // 👉 Find related doctors (same specialization, exclude current doctor)
  const relatedDoctors = doctors.filter(
    (doc) => doc.specialization === doctor.specialization && doc.id !== doctor.id
  );

  return (
    <div className="w-full min-h-screen py-10 px-5 sm:px-10 lg:px-20 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left - Image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="rounded-xl border-4 border-white shadow-lg w-[290px] h-[250px] object-cover"
          />
        </div>

        {/* Right - Details + Slots */}
        <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-600">{doctor.name}</h2>
          <p className="text-gray-600 text-lg mb-2">{doctor.specialization}</p>
          <p className="text-gray-500 mb-2">Experience: 4+ years</p>
          <p className="text-gray-700 mb-4">
            {doctor.name} is an experienced {doctor.specialization} dedicated to
            providing the highest level of patient care and treatment.
          </p>
          <p className="text-lg font-semibold text-gray-800 mb-6">
            Appointment Fee: <span className="text-green-600">₹500</span>
          </p>

          {/* Days Selection */}
          <div className="bg-gray-50 border rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center lg:text-left">
              Select Day
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {next7Days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedSlot(null);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm sm:text-base ${
                    selectedDay.fullDate === day.fullDate
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>

            {/* Slots */}
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center lg:text-left">
              Select Time Slot
            </h3>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-3 pb-2">
                {slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-2 py-2 border rounded-lg min-w-[100px] text-center transition
                      ${
                        selectedSlot === slot
                          ? "bg-blue-500 text-white border-blue-600"
                          : "border-blue-400 hover:bg-blue-100"
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="text-white py-3 rounded-lg hover:bg-blue-700 transition btn btn-info"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Related Doctors Section */}
      {relatedDoctors.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Other {doctor.specialization}s
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedDoctors.map((doc) => (
              <Link key={doc.id} to={`/appointment/${doc.id}`} className="block">
                <div className="card bg-blue-50 shadow-md hover:shadow-xl transition cursor-pointer">
                  <figure className="px-6 pt-6">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="rounded-xl border-4 border-white shadow-md h-[250px] w-[250px] object-cover"
                    />
                  </figure>
                  <div className="card-body items-center text-center p-4">
                    <h3 className="card-title text-base font-semibold text-gray-800">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doc.specialization}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
