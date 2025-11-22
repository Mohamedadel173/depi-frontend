import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 

// استيراد الأقسام والمكونات الرئيسية
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

import './Blockly.css';
import BlocklyComponent from './Blockly';

// استيراد مكونات المستويات والاختبارات
import Levels from "./components/Levels";
import Quiz from "./components/Quiz";

// استيراد صفحات التفاعل الرئيسية
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingPage from "./pages/ShoppingPage";
import UserDashboard from "./pages/UserDashboard";

const AppContent = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  // نخفي Navbar لو في صفحة Blockly
  const showNavbar = location.pathname !== "/blockly";

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Blur Effect */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <div className="overflow-hidden">
        {/* Navbar */}
        {showNavbar && <Navbar />}

        <Routes>
          {/* 🏠 الصفحة الرئيسية */}
          <Route
            path="/"
            element={
              <div className="container mx-auto max-w-7xl">
                <Hero />
                <About />
                <Testimonial />
                <Contact />
                <Footer />
              </div>
            }
          />

          {/* 🔐 المصادقة */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 👤 المستخدم */}
          <Route path="/user" element={<UserDashboard />} />

          {/* 🛍️ متجر */}
          <Route path="/shop" element={<ShoppingPage />} />

          {/* 🧩 التعلم */}
          <Route path="/levels" element={<Levels />} />

          {/* ⭐ صفحة Blockly (Level 3) */}
          <Route path="/blockly" element={<BlocklyComponent />} />

          {/* 🌟 صفحة الاختبارات */}
          <Route
            path="/quiz/:levelId"
            element={<Quiz setProgress={setProgress} />}
          />
        </Routes>
      </div>
    </main>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
