import React from 'react';

// بيانات أعضاء الفريق مع افتراض المسارات المحلية للصور
// المسارات المفترضة هي: /assets/name.png
const teamMembers = [
  {
    id: 1,
    name: "Mariam Mostafa",
    title: "MERN Stack Developer",
    email: "mariammostafamohammed4@gmail.com",
    image: "/src/assets/Mariam_Mostafa.png",
    placeholderColor: "5C33CC", // Royal
    rating: 5,
  },
  {
    id: 2,
    name: "Mohamed Adel",
    title: "MERN Stack Developer",
    email: "mohamed_adel@gmail.com",
    image: "/src/assets/mohamed_adel.png",
    placeholderColor: "CA2F8C", // Fuchsia
    rating: 5,
  },
  {
    id: 3,
    name: "Salma Refeat",
    title: "FrontEnd Developer",
    email: "Salma Refeat@gmail.com",
    image: "/src/assets/Salma_Refat.png",
    placeholderColor: "7A57DB", // Lavender
    rating: 5,
  },
  {
    id: 4,
    name: "Nadeen Hani",
    title: "FrontEnd Developer",
    email: "Nadeen Hani@gmail.com",
    image: "/src/assets/Nadeen_Hany.PNG",
    placeholderColor: "5C33CC",
    rating: 5,
  },
  {
    id: 5,
    name: "Ahmed Tawfik",
    title: "FrontEnd Developer",
    email: "Ahmed Tawfik@gmail.com",
    image: "/src/assets/AhmedTawfikPhoto.png",
    placeholderColor: "CA2F8C",
    rating: 5,
  },
];

// مكون تقييم النجوم
const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center my-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 md:w-5 md:h-5 ${
            i < rating ? 'text-orange-400' : 'text-neutral-700'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// مكون بطاقة العضو
const TeamCard = ({ member }) => {
  // تصميم بطاقة متدرج وداكن
  const gradientClass = `bg-gradient-to-br from-fuchsia-600/20 via-blue-600/20 to-indigo-600/20`;

  // دالة لتوليد الصورة الاحتياطية (Placeholder)
  const generatePlaceholder = (name, color) => {
    const initial = name.substring(0, 1);
    return `https://placehold.co/150x150/${color}/FFFFFF/png?text=${initial}`;
  };

  return (
    <div
      className={`relative p-4 sm:p-6 shadow-2xl transition-all duration-300 transform 
                  ${gradientClass} backdrop-blur-sm border border-fuchsia-500/30 
                  rounded-[2.5rem] hover:shadow-lg hover:-translate-y-2 hover:border-fuchsia-500/50`}
    >
      {/* الصورة الدائرية في المنتصف */}
      <div className="flex justify-center -mt-16 mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-teal-400 shadow-xl hover:shadow-2xl transition duration-300"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = generatePlaceholder(member.name, member.placeholderColor);
          }}
        />
      </div>

      {/* معلومات العضو */}
      <div className="text-center text-white">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-indigo-300">{member.name}</h3>
        <p className="text-fuchsia-400 text-sm md:text-base mb-2">{member.title}</p>
        <StarRating rating={member.rating} />
        
        {/* رابط البريد الإلكتروني */}
        <a 
          href={`mailto:${member.email}`} 
          className="text-neutral-400 text-xs md:text-sm hover:text-teal-400 transition duration-200 block mt-2"
        >
          {member.email}
        </a>
      </div>
    </div>
  );
};

export default function TeamPage() {
  return (
    // الخلفية الأساسية
    <div id="team-section" className="min-h-screen bg-[#030412] text-white py-12 md:py-24 relative overflow-hidden font-sans">
      
      {/* تأثيرات ضبابية للخلفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

      <div className="container mx-auto max-w-7xl px-4 c-space z-10 relative">
        {/* العنوان الرئيسي والوصف */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <div className="inline-block p-2 px-8 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600 shadow-lg shadow-fuchsia-600/40 mb-4">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                Our Team Members
            </h2>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-indigo-300">
            MEET OUR TEAM
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl">
            The dedicated minds behind your next coding adventure.
          </p>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20"> 
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}