import { useSelector } from "react-redux";

function MyAppointments() {
  const appointments = useSelector((state) => state.appointments.list);

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No appointments booked yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-6 sm:px-12 lg:px-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8">
        My Appointments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-center bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
          >
            {/* Doctor Image */}
            <img
              src={appt.doctor.image}
              alt={appt.doctor.name}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />

            {/* Doctor & Appointment Details */}
            <div>
              <h3 className="text-lg font-bold text-blue-700">
                {appt.doctor.name}
              </h3>
              <p className="text-gray-600">{appt.doctor.specialization}</p>
              <p className="text-sm text-gray-500">
                {appt.day}, {appt.time}
              </p>
              <p className="text-green-600 font-medium">Fee: ₹500</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
