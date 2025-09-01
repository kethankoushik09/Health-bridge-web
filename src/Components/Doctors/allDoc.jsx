import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../../Redux/doctors/doctorSlice";

function AllDoc() {
  const dispatch = useDispatch();
  const { list: doctors, loading } = useSelector((state) => state.doctors);

  const { speciality } = useParams(); // 👈 get speciality from URL
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // ✅ Sync state with URL param
  useEffect(() => {
    if (speciality) {
      setSelectedFilter(speciality);
    } else {
      setSelectedFilter("All");
    }
  }, [speciality]);

  const specializations = ["All", ...new Set(doctors.map((doc) => doc.speciality))];

  const filteredDoctors =
    selectedFilter === "All"
      ? doctors
      : doctors.filter((doc) => doc.speciality === selectedFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-5 sm:px-10 lg:px-20">
      <h2 className="text-2xl font-bold text-center mb-2">All Doctors</h2>
      <p className="text-center text-gray-600 mb-6">
        Browse through our list of expert doctors and find the right specialist for you.
      </p>

      {/* ✅ Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {specializations.map((spec, i) => (
          <button
            key={i}
            onClick={() => {
              if (spec === "All") {
                navigate("/all-doctors");
              } else {
                navigate(`/all-doctors/${spec}`);
              }
            }}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition 
              ${
                selectedFilter === spec
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-transparent border-gray-400 text-gray-700 hover:bg-blue-100"
              }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredDoctors.map((doc) => (
          <Link key={doc._id} to={`/appointment/${doc._id}`} className="block">
            <div className="card bg-blue-50 shadow-md hover:shadow-xl transition cursor-pointer">
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
    </div>
  );
}

export default AllDoc;
