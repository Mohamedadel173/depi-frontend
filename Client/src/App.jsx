import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 

// صفحات
import TeamPage from "./pages/TeamPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import './Blockly.css';
import BlocklyComponent from './Blockly';
import Levels from "./components/Levels";
import Quiz from "./components/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";

const AppContent = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const showNavbar = location.pathname !== "/blockly";

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <div className="overflow-hidden">
        {showNavbar && <Navbar />}

        <Routes>
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

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<EmailVerificationPage />} />
          <Route path="/user" element={<UserDashboard />} />
     
          <Route path="/levels" element={<Levels />} />
          <Route path="/blockly" element={<BlocklyComponent />} />
          <Route path="/quiz/:levelId" element={<Quiz setProgress={setProgress} />} />
          <Route path="/team" element={<TeamPage />} />  
          <Route path="*" element={<div className="text-center text-white py-32 text-3xl">Page Not Found</div>} />
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
