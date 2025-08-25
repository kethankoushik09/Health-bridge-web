import { useState } from "react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Sign Up Data:", { name, email, password });
      // TODO: Add SignUp API call
    } else {
      console.log("Sign In Data:", { email, password });
      // TODO: Add SignIn API call
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-blue-100 to-white-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Name
              </label>
              <input
                type="text"
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
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
