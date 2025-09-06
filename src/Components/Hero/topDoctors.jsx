import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { fetchDoctors } from "../../Redux/doctors/doctorSlice.js";

export default function TopDoctors() {
  const dispatch = useDispatch();
  const { list: doctors, loading } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Loading top doctors...</p>;
  }

  const topDoctors = doctors.slice(0, 8);

  return (
    <div className="w-full py-10 px-5 sm:px-10 lg:px-20">
      <h2 className="text-2xl font-bold text-center mb-2">Top Doctors</h2>
      <p className="text-center text-gray-600 mb-8">
        Meet our highly qualified doctors, available to provide you the best care.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topDoctors.map((doc) => (
          <Link to={`/appointment/${doc._id}`} key={doc._id}>
            <div className="card bg-blue-50 shadow-md hover:shadow-xl transition">
              <figure className="px-6 pt-6">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="rounded-xl border-4 border-white shadow-md h-[280px] w-[280px] object-cover"
                />
              </figure>
              <div className="card-body items-center text-center p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      doc.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-sm text-gray-600">
                    {doc.available ? "Available" : "Not Available"}
                  </span>
                </div>
                <h3 className="card-title text-base font-semibold text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600">{doc.speciality}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/all-doctors">
          <button className="btn btn-active btn-info px-9 py-2 rounded-full">
            More
          </button>
        </Link>
      </div>
    </div>
  );
}
