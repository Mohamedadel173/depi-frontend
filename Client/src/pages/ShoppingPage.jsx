import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LevelsPage() {
  const [completedLevels, setCompletedLevels] = useState(1); // عدد المستويات المكتملة
  const totalLevels = 3;

  const progress = (completedLevels / totalLevels) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 flex flex-col justify-between overflow-auto">
      {/* المحتوى الرئيسي */}
      <div className="flex flex-col items-center py-12 px-4 sm:px-6 md:px-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-2">
          Your Learning Levels
        </h1>
        <p className="text-gray-700 max-w-md sm:max-w-xl md:max-w-2xl mb-6">
          Choose your next adventure and unlock new challenges to sharpen your algorithm skills!
        </p>

        {/* 🔹 شريط التقدم */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mb-10">
          <p className="text-lg font-medium text-purple-700 mb-2">
            🎯 Progress: Level {completedLevels} of {totalLevels} Completed
          </p>
          <div className="w-full bg-purple-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-500 h-4 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* بطاقات المستويات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {["Sorting", "Dynamic Programming", "Graphs"].map((level, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-all flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold text-purple-700 mb-3">
                Level {index + 1}: {level}
              </h2>
              <p className="text-gray-600 mb-4">
                {level === "Sorting"
                  ? "Learn sorting algorithms with fun and interactive challenges."
                  : level === "Dynamic Programming"
                  ? "Master recursion and optimization with DP visual challenges."
                  : "Explore shortest paths and graph algorithms with visual tools."}
              </p>
              <button
                onClick={() => setCompletedLevels(index + 1)}
                className={`px-6 py-2 rounded-xl text-white font-semibold transition ${
                  completedLevels >= index + 1
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-purple-700 hover:bg-purple-800"
                }`}
              >
                {completedLevels >= index + 1 ? "Completed ✓" : "Start Level"}
              </button>
            </div>
          ))}
        </div>

        {/* زر العودة للصفحة الرئيسية */}
        <Link
          to="/"
          className="mt-10 bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all"
        >
          Back to Home
        </Link>
      </div>

      {/* الفوتر */}
      <footer className="bg-purple-800 text-white text-center py-4 mt-6">
        <p className="text-sm">&copy; 2025 Algo Arcade. All rights reserved.</p>
      </footer>
    </div>
  );
}
