import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constant";

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.list);

  const doctor = doctors.find((doc) => doc._id === id);

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
          time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })
        );
      }
    }
    return slots;
  };

  const slots = generateSlots();

 const handleBooking = async () => {
  if (!selectedSlot) {
    toast.error("Please select a time slot before booking!");
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/bookAppointment`,
      {
        docId: doctor._id,
        slotDate: selectedDay.fullDate,
        slotTime: selectedSlot,
      },
      { withCredentials: true }
    );

    if (response.data.success) {
      toast.success(
        `Appointment booked with ${doctor.name} on ${selectedDay.label} at ${selectedSlot}`
      );
      navigate("/appointments");
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    if (err.response && err.response.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Something went wrong while booking!");
    }
  }
};


  if (!doctor) {
    return <p className="text-center mt-10 text-red-500">Doctor not found</p>;
  }

  //  Find related doctors (same specialization, exclude current doctor)
  const relatedDoctors = doctors.filter(
    (doc) => doc.speciality === doctor.speciality && doc._id !== doctor._id
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
          <p className="text-gray-600 text-lg mb-2">{doctor.speciality}</p>
          <p className="text-gray-500 mb-2">
            Experience: {doctor.experience} years
          </p>
          <p className="text-gray-700 mb-4">
            {doctor.name} is an experienced {doctor.speciality} dedicated to
            providing the highest level of patient care and treatment.
          </p>
          <p className="text-lg font-semibold text-gray-800 mb-6">
            Appointment Fee:{" "}
            <span className="text-green-600">{doctor.fees}</span>
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
                {slots.map((slot, i) => {
                 
                  const now = new Date();
                  const isToday =
                    selectedDay.fullDate === today.toISOString().split("T")[0];
                  const [timePart, meridian] = slot.split(" ");
                  const [slotHour, slotMinute] = timePart
                    .split(":")
                    .map((s) => parseInt(s));
                  const slotDateTime = new Date();
                   slotDateTime.setHours(
                    (slotHour % 12) + (meridian === "PM" ? 12 : 0),
                    slotMinute,
                    0
                  );
                  const isPast = isToday && slotDateTime <= now;

                  const bookedSlotsForDay =
                    doctor.slots_booked?.[selectedDay.fullDate] || [];
                  const isBooked = bookedSlotsForDay.includes(slot);

                  return (
                    <button
                      key={i}
                      onClick={() =>
                        !isBooked && !isPast && setSelectedSlot(slot)
                      }
                      disabled={isBooked || isPast}
                      className={`px-2 py-2 border rounded-lg min-w-[100px] text-center transition
          ${
            selectedSlot === slot
              ? "bg-blue-500 text-white border-blue-600"
              : isBooked || isPast
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "border-blue-400 hover:bg-blue-100"
          }`}
                    >
                      {slot}
                    </button>
                  );
                })}
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
            Other {doctor.speciality}s
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedDoctors.map((doc) => (
              <Link
                key={doc._id}
                to={`/appointment/${doc._id}`}
                className="block"
              >
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
                    <p className="text-sm text-gray-600">
                      {doc.specialization}
                    </p>
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
