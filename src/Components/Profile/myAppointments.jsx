import { useEffect, useState } from "react";
import axios from "axios";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/getAppointments",
        { withCredentials: true }
      );
      if (response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        alert("Failed to fetch appointments");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePayNow = (appointmentId) => {
    alert(`Redirecting to payment for appointment ${appointmentId}`);
    // You can integrate your payment gateway here
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (appointments.length === 0)
    return <p className="text-center mt-10">No appointments found</p>;

  return (
    <div className="w-full min-h-screen py-10 px-5 sm:px-10 lg:px-20 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Appointments
      </h2>

      <div className="space-y-6">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="flex flex-col sm:flex-row items-center border p-4 m-8 gap-9"
          >
            {/* Doctor Image */}
            <img
              src={appt.docData.image}
              alt={appt.docData.name}
              className="w-40 h-40 rounded-xl object-cover border-2 border-gray-200"
            />

            {/* Doctor Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {appt.docData.name}
              </h3>
              <p className="text-gray-600">{appt.docData.speciality}</p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(appt.slotDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Time:</span> {appt.slotTime}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Fee:</span> ${appt.docData.fees}
              </p>
            </div>

            {/* Pay Button */}
            {!appt.payment && (
              <button
                onClick={() => handlePayNow(appt._id)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Pay Now
              </button>
            )}

            {appt.payment && (
              <span className="text-green-600 font-semibold">Paid</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
