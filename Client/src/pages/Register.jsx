import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // منطق تحديث الحالة الأساسي
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted:", formData);
    // بعد التسجيل، نروح لصفحة Levels
    navigate("/levels");
  };

  return (
    // عنصر الـ div الرئيسي - الخلفية الداكنة والتوسيط
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-6 sm:py-12 relative overflow-hidden">
      
      {/* 🌠 تأثير ضبابي خفيف للخلفية - نقاط ضوء متفرقة */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl opacity-20"></div>

      {/* 2. بطاقة النموذج (Card) - تصميم داكن وزجاجي خفيف */}
      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full max-w-md p-8 sm:p-10 space-y-7 border border-gray-700/70 z-10">
        
        {/* العنوان (Gradient Text) */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Create Your Account
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base">
          Join <span className="font-semibold text-purple-400">Algo Arcade</span> and start your coding journey! 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              // تنسيق الإدخال: خلفية داكنة ونصوص فاتحة
              className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

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

          {/* زر التسجيل (Gradient Button) */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                       shadow-sm text-lg font-semibold text-white 
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       hover:from-purple-700 hover:to-pink-700 transition duration-150 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>

        {/* رابط تسجيل الدخول */}
        <p className="text-center text-gray-400 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300 transition">
            Log in
          </Link>
        </p>
       
      </div>
    </div>
  );
}