import React from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl text-center border border-purple-100">
        <h1 className="text-4xl font-bold text-[#370d5f] mb-4">
          Welcome to Algo Arcade 🎮
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          You’re now logged in! Choose what you’d like to explore next.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/levels"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 font-semibold"
          >
            Explore Levels
          </Link>

          <Link
            to="/shop"
            className="bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700 transition-all hover:shadow-lg hover:shadow-pink-200 font-semibold"
          >
            Go to Shop
          </Link>

          <Link
            to="/"
            className="bg-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-300 transition-all hover:shadow-lg hover:shadow-gray-100 font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
