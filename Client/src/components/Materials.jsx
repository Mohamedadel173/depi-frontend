import React from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

export default function Materials() {
  const videos = [
    { id: "kQPC4_DsJ8I", title: "What is Computer" },
    { id: "zXxuxJvRddU", title: "How Computer See Pattern" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>

      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center
                       bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-poppins">
          Learning Materials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video.id} className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="p-4 text-center text-white font-semibold text-lg">
                {video.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
