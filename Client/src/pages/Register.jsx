import React, { useState } from "react";
import { register } from "../api.js"; // دالة التسجيل من API

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    birthday: "2004-01-01",
    role: "user",
    isVerified: false,
    purchasedLevels: []
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = (path) => { window.location.pathname = path; };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    console.log("Sending registration:", formData);

    try {
      const { ok, data } = await register(formData);

      if (!ok) {
        setErrorMsg(data.msg || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/levels");
    } catch (error) {
      console.error("Register error:", error);
      setErrorMsg("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-6 sm:py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl opacity-20"></div>

      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full max-w-md p-8 sm:p-10 space-y-6 border border-gray-700/70 z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Create Your Account
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base">
          Join <span className="font-semibold text-purple-400">Algo Arcade</span> and start your coding journey! 🚀
        </p>

        {errorMsg && (
          <div className="text-red-400 text-sm text-center font-medium">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Mobile</label>
            <input
              type="text"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+201012345678"
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Role (hidden) */}
          <input type="hidden" name="role" value={formData.role} />

          {/* isVerified (hidden) */}
          <input type="hidden" name="isVerified" value={formData.isVerified} />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white 
                       bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition duration-150 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm sm:text-base">
          Already have an account?{" "}
          <a
            href="/login"
            onClick={(e) => { e.preventDefault(); navigate("/login"); }}
            className="text-purple-400 font-semibold hover:text-purple-300 transition cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
