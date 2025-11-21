import React, { useState } from "react";
// لم نعد نستورد Link أو useNavigate لأننا نستخدم آليات تنقل بديلة
// import { Link, useNavigate } from "react-router-dom"; 

const IllustrationSection = () => (
    // تصميم قسم التوضيح، مع تأثيرات الخلفية الضبابية ليتناسب مع صفحة Register
    <div className="relative p-8 md:p-16 flex flex-col items-center justify-center text-center text-white bg-gray-900 h-full">
        
        {/* تأثيرات ضبابية (منسوخة من Register) */}
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>

        <div className="z-10 space-y-4">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Welcome Back, Coder!
            </h1>
            <p className="text-gray-400 text-lg max-w-sm mx-auto">
                Continue your journey to master algorithms and data structures.
            </p>
            {/* Placeholder Icon/Illustration */}
            <svg className="w-40 h-40 mx-auto text-purple-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
        </div>
    </div>
);

// تم تمرير دالة navigate كمُعامل (Prop) بدلاً من استخدام هوك useNavigate
const LoginForm = ({ navigate }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", formData);
        // استخدام دالة التنقل الممررة
        navigate("/levels");
    };

    return (
        // بطاقة النموذج (Card)
        <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-7 border border-gray-700/70">
            
            <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Log In
            </h2>
            <p className="text-center text-gray-400 text-sm">
                Access your <span className="font-semibold text-purple-400">Algo Arcade</span> challenges.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* زر تسجيل الدخول (Gradient Button) */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                               shadow-sm text-lg font-semibold text-white 
                               bg-gradient-to-r from-purple-600 to-pink-600 
                               hover:from-purple-700 hover:to-pink-700 transition duration-150 
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    Log In
                </button>
            </form>

            {/* رابط التسجيل */}
            <p className="text-center text-gray-400 text-sm sm:text-base">
                Don't have an account?{" "}
                {/* تم استبدال Link بـ <a> واستخدام navigate */}
                <a 
                    href="/register" 
                    onClick={(e) => { e.preventDefault(); navigate("/register"); }}
                    className="text-purple-400 font-semibold hover:text-purple-300 transition cursor-pointer"
                >
                    Sign up
                </a>
            </p>
        </div>
    );
};

export default function LoginPage() {
    // 1. دالة تحاكي التنقل باستخدام مسار النافذة (Window Path)
    const navigate = (path) => { 
        window.location.pathname = path; 
    };

    return (
        // حاوية الشاشة الرئيسية - تقسيم الشاشة أفقياً على الأجهزة الكبيرة
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
            
            {/* 1. قسم التوضيح - يظهر بنصف العرض على الشاشات الكبيرة */}
            <div className="md:w-1/2 flex-shrink-0 h-64 md:h-screen">
                <IllustrationSection />
            </div>

            {/* 2. قسم النموذج - يظهر بنصف العرض على الشاشات الكبيرة وبلون خلفية أغمق قليلاً */}
            <div className="md:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-900/50">
                {/* 2. تم تمرير دالة navigate المقلدة كمُعامل */}
                <LoginForm navigate={navigate} />
            </div>
        </div>
    );
};