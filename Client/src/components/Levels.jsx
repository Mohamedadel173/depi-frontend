import { Link } from "react-router-dom";
import Navbar from "../sections/navbar";
import Footer from "../sections/Footer";

const levelData = [
  { id: 1, name: "Level 1: What is Computer", image: "/Levels/level1.png", color: "purple" },
  { id: 2, name: "Level 2: How Computer See Patterns", image: "/Levels/level2.png", color: "blue" },
  { id: 3, name: "Level 3: Classification With Objects", image: "/Levels/level3.png", color: "green" },
  { id: 4, name: "Level 4", image: "/Levels/level4.png", color: "pink" },
  { id: 5, name: "Level 5", image: "/Levels/level5.png", color: "yellow" },
];

export default function Levels() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
        {/* 🌠 تأثير ضبابي خفيف للخلفية */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>

      {/* 🎯 Navbar ثابت (لم يتم تغييره) */}
      <Navbar />

      {/* المحتوى الرئيسي مع حشوة علوية (pt-24) لتجنب تداخل الـ Navbar */}
      <div className="flex-grow max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        
        {/* العنوان الرئيسي (بتدرج لوني) */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-poppins">
          Development Levels
        </h2>
        <p className="text-base sm:text-lg mb-10 text-center text-gray-400 font-poppins">Start your journey in computer science step by step with Lulu.
        </p>

        {/* شبكة عرض البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {levelData.map(level => (
            <Link
              key={level.id}
              to={`/quiz/${level.id}`}
              
                // ✅ تصميم البطاقة الزجاجي والتفاعلي
              className={`
                    relative bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-${level.color}-400/30 
                    hover:shadow-2xl hover:border-${level.color}-400 transition-all duration-300 transform 
                    hover:-translate-y-1 overflow-hidden flex flex-col
                `}
            >
                {/* 🎨 تأثير الوهج داخل البطاقة */}
                <div className={`absolute inset-0 bg-${level.color}-500/10 opacity-0 transition-opacity duration-300 hover:opacity-10`}></div>

              <img
                src={level.image}
                alt={level.name}
                className="w-full h-40 sm:h-44 md:h-48 object-cover opacity-75 hover:opacity-100 transition-opacity"
              />
              <div className="p-4 text-center">
                <span className={`font-semibold text-white text-lg sm:text-xl transition-colors`}>
                  {level.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 🎯 Footer (لم يتم تغييره) */}
      <Footer />
    </div>
  );
}