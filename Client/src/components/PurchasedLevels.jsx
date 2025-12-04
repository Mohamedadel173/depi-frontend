import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

export default function PurchasedLevels() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLevels = JSON.parse(localStorage.getItem("purchasedLevels") || "[]");
    setLevels(storedLevels);
    setTimeout(() => setLoading(false), 300);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-2xl bg-gray-900">
        Loading Purchased Levels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Blob background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>

      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10 flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col items-center text-white">
          <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full text-center border border-purple-300">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to Algo Arcade 🎮</h2>
            <p className="text-gray-300 text-sm mb-6">You’re now logged in! Choose where to go next.</p>

            <div className="flex flex-col gap-4">
              <Link
                to="/levels"
                className="bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-all hover:shadow-lg hover:shadow-purple-400 font-semibold text-center"
              >
                Explore Levels
              </Link>
              <a
  href="https://wa.me/201220988237?text=Hi%20I%20need%20help"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-pink-600 text-white px-4 py-3 rounded-xl hover:bg-pink-700 transition-all hover:shadow-lg hover:shadow-pink-400 font-semibold text-center"
>
  Needs Help
</a>

              <Link
    to="/materials"
    className="bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-all hover:shadow-lg hover:shadow-gray-200 font-semibold text-center"
  >
    Materials
  </Link>
            </div>
          </div>
        </div>

        {/* Purchased Levels */}
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold mb-6 text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-poppins">
            My Purchased Levels
          </h2>

          {levels.length === 0 ? (
            <p className="text-gray-400 text-center">You have not purchased any levels yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className="relative bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col"
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
                    
                  <Link
  to={
    level.id === 2
      ? "/level2"
      : level.id === 3
      ? "/blockly"
      : `/quiz/${level.id}`
  }
  className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-center transition-all"
>
  Start Level
</Link>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
