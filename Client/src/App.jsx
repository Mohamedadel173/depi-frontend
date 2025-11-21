import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

// استيراد الأقسام والمكونات الرئيسية
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero"; // ✨ يُعرض في الصفحة الرئيسية
import About from "./sections/About";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

// استيراد مكونات المستويات والاختبارات
import Levels from "./components/Levels";
import Quiz from "./components/Quiz";

// استيراد صفحات التفاعل الرئيسية
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ هذا هو المكون الذي سنتنقل إليه
import ShoppingPage from "./pages/ShoppingPage";
import UserDashboard from "./pages/UserDashboard";


const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <Router> 
      <main className="relative min-h-screen overflow-x-hidden">
        
        {/* Background Blur Effect */}
        <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

        <div className="overflow-hidden">
          {/* Navbar: يظهر في جميع الصفحات */}
          <Navbar />

          <Routes>
            {/* 🏠 المسار الرئيسي (الصفحة الهبوط) */}
            <Route
              path="/"
              element={
                <div className="container mx-auto max-w-7xl">
                  <Hero />
                  <About />
                  <Testimonial />
                  <Contact />
                  <Footer/>
                </div>
              }
            />

            {/* 🔐 مسارات المصادقة */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* ✅ المسار المطلوب */}

            {/* 👤 صفحات المستخدم */}
            <Route path="/user" element={<UserDashboard />} />

            {/* 🛍️ صفحة التسوق */}
            <Route path="/shop" element={<ShoppingPage />} />

            {/* 🧩 صفحات التعلم */}
            <Route path="/levels" element={<Levels />} />
            <Route
              path="/quiz/:levelId"
              element={<Quiz setProgress={setProgress} />}
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;