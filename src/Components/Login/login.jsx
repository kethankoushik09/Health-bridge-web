import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils/constant.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/User/userSlice.js";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const disptach = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      if (isSignUp) {
        formdata.append("name", name);
        const res = await axios.post(
          BASE_URL + "/api/user/register",
          formdata,
          { withCredentials: true }
        );

        disptach(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        const res = await axios.post(BASE_URL + "/api/user/login", formdata, {
          withCredentials: true,
        });
        disptach(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-3 text-blue-600">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          {isSignUp
            ? "Please signup to book appointment"
            : "Please login to book appointment"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
