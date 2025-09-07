import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constant";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";  

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/getAppointments`, {
        withCredentials: true,
      });
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

  const handleCancel = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/cancelAppointment`,
        { appointmentId },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments(); // refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while cancelling appointment");
    }
  };

  // to check if appointment is already in the past
  const isPastAppointment = (slotDate, slotTime) => {
    const appointmentDateTime = new Date(`${slotDate} ${slotTime}`);
    return appointmentDateTime < new Date();
  };

  if (loading)
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Lottie
        animationData={loading}
        loop={true}
        className="w-40 h-40" // adjust size
      />
    </div>
  );


  if (appointments.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-center text-gray-700 text-lg">
          No appointments found
        </p>
      </div>
    );

  return (
    <div className="w-full min-h-screen py-10 px-5 sm:px-10 lg:px-40 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Appointments
      </h2>

      <div className="space-y-6">
        {appointments.map((appt) => {
          // 🔹 Decide appointment status
          let status = "Scheduled";
          let statusColor = "text-yellow-600";

          if (appt.cancelled) {
            status = "Cancelled";
            statusColor = "text-red-600";
          } else if (isPastAppointment(appt.slotDate, appt.slotTime)) {
            status = "Completed";
            statusColor = "text-green-600";
          }

          return (
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
                  <span className="font-semibold">Fee:</span> $
                  {appt.docData.fees}
                </p>
                {/* 🔹 Appointment Status */}
                <p className={`font-semibold ${statusColor}`}>{status}</p>
              </div>

              {/* 🔹 Cancel button only if scheduled */}
              {!appt.cancelled &&
              !isPastAppointment(appt.slotDate, appt.slotTime) ? (
                <button
                  onClick={() => handleCancel(appt._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
