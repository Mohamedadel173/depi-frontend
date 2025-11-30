import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

const levelData = [
  { id: 1, name: "Level 1: What is Computer", image: "/Levels/level1.png", color: "purple" },
  { id: 2, name: "Level 2: How Computer See Patterns", image: "/Levels/level2.png", color: "blue" },
  { id: 3, name: "Level 3: Classification With Objects", image: "/Levels/level3.png", color: "green" },
  { id: 4, name: "Level 4", image: "/Levels/level4.png", color: "pink" },
  { id: 5, name: "Level 5", image: "/Levels/level5.png", color: "yellow" },
];

export default function Levels() {
  const navigate = useNavigate();
  const [purchasedLevels, setPurchasedLevels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedLevels = JSON.parse(localStorage.getItem("purchasedLevels") || "[]");
    setPurchasedLevels(storedLevels);
  }, [navigate]);

  const payForLevel = (level) => {
    if (!purchasedLevels.some(l => l.id === level.id)) {
      alert(`Payment successful for ${level.name}! 🎉`);

      const newPurchased = [...purchasedLevels, level];
      setPurchasedLevels(newPurchased);
      localStorage.setItem("purchasedLevels", JSON.stringify(newPurchased));

      navigate("/purchased-levels");
    }
  };

  const getBorderClass = (color) => {
    switch (color) {
      case "purple": return "border-purple-400 hover:border-purple-500";
      case "blue": return "border-blue-400 hover:border-blue-500";
      case "green": return "border-green-400 hover:border-green-500";
      case "pink": return "border-pink-400 hover:border-pink-500";
      case "yellow": return "border-yellow-400 hover:border-yellow-500";
      default: return "border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Blob background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>

      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-poppins">
          Development Levels
        </h2>

        <p className="text-base sm:text-lg mb-10 text-center text-gray-400 font-poppins">
          Start your journey in computer science step by step with Lulu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {levelData.map(level => {
            const isPurchased = purchasedLevels.some(l => l.id === level.id);

            return (
              <div
                key={level.id}
                className={`
                  relative bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border ${getBorderClass(level.color)}
                  transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col
                `}
              >
                <div className="relative">
                  <img
                    src={level.image}
                    alt={level.name}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover opacity-75 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-lg sm:text-xl font-semibold text-center py-2">
                    {level.name}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  {isPurchased ? (
                    <Link
                      to={level.id === 3 ? "/blockly" : `/quiz/${level.id}`}
                      className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-center"
                    >
                      Start Level
                    </Link>
                  ) : (
                    <button
                      onClick={() => payForLevel(level)}
                      className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-center"
                    >
                      Buy Level
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
