import React from "react";

// بيانات أعضاء الفريق مع صور وهمية (Placeholders)
// ملاحظة: تم تحديث مسار الصورة ليتطابق مع مجلد الأصول (assets) المحلي.
// يجب عليك التأكد من وضع صورك في مسار مماثل (مثل: /public/assets/team/)
const teamMembers = [
  {
    id: 1,
    name: "Mar
    ",
    title: "Project Manager",
    email: "jack@algo.com",
    image: "/assets/Mariam_Mostafa.png", // المسار المحلي المفترض
    placeholderColor: "5C33CC", // Royal color for fallback
    rating: 5,
  },
  {
    id: 2,
    name: "Cynthia Carr",
    title: "Managing Director",
    email: "cynthia@algo.com",
    image: "/assets/Mohamed_adel.png",
    placeholderColor: "CA2F8C", // Fuchsia color for fallback
    rating: 5,
  },
  {
    id: 3,
    name: "Russell Patel",
    title: "Lead Developer",
    email: "russell@algo.com",
    image: "/assets/Salma_Refat.png",
    placeholderColor: "7A57DB", // Lavender color for fallback
    rating: 4,
  },
  {
    id: 4,
    name: "Eugene Miller",
    title: "Account Manager",
    email: "eugene@algo.com",
    image: "/assets/Nadeen_Hany.PNG",
    placeholderColor: "5C33CC",
    rating: 5,
  },
  {
    id: 5,
    name: "Adam Rivera",
    title: "UX/UI Expert",
    email: "adam@algo.com",
    image: "/assets/AhmedTawfikPhoto.png",
    placeholderColor: "CA2F8C",
    rating: 4,
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
            i < rating ? 'text-orange' : 'text-neutral-700' // استخدام Orange للتمييز
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
  // استخدام تدرجات الألوان المخصصة (Fuchsia و Royal) لتطابق الثيم
  const gradientClass = `bg-gradient-to-br from-fuchsia/40 via-royal/40 to-indigo/40`;

  // دالة لتوليد الصورة الاحتياطية (Placeholder)
  const generatePlaceholder = (name, color) => {
    // نحصل على الحرف الأول من الاسم لتظهر داخل الدائرة
    const initial = name.substring(0, 1);
    return `https://placehold.co/150x150/${color}/FFFFFF/png?text=${initial}`;
  };

  return (
    <div
      className={`relative p-4 sm:p-6 shadow-2xl transition-all duration-300 transform 
                  ${gradientClass} backdrop-blur-sm border border-fuchsia/30 
                  rounded-[2.5rem] hover:shadow-lg hover:-translate-y-2 hover:border-fuchsia/50`}
    >
      {/* الصورة الدائرية في المنتصف */}
      <div className="flex justify-center -mt-16 mb-6">
        <img
          // استخدام المسار المحلي الجديد
          src={member.image}
          alt={member.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-mint shadow-xl hover:shadow-2xl transition duration-300"
          onError={(e) => {
            e.target.onerror = null; // يمنع حلقة لا نهائية
            // في حال فشل تحميل الصورة المحلية، نستخدم الصورة الاحتياطية الملونة
            e.target.src = generatePlaceholder(member.name, member.placeholderColor);
          }}
        />
      </div>

      {/* معلومات العضو */}
      <div className="text-center text-white">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-lavender">{member.name}</h3>
        <p className="text-fuchsia text-sm md:text-base mb-2">{member.title}</p>
        <StarRating rating={member.rating} />
        
        {/* رابط البريد الإلكتروني */}
        <a 
          href={`mailto:${member.email}`} 
          className="text-neutral-400 text-xs md:text-sm hover:text-mint transition duration-200 block mt-2"
        >
          {member.email}
        </a>
      </div>
    </div>
  );
};

export default function TeamPage() {
  return (
    // الخلفية الأساسية (primary: #030412)
    <div className="min-h-screen bg-primary text-white py-12 md:py-24 relative overflow-hidden">
      
      {/* 🌠 تأثيرات ضبابية خفيفة للخلفية باستخدام الألوان المخصصة */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-royal/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-fuchsia/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

      <div className="container mx-auto max-w-7xl px-4 c-space z-10 relative">
        {/* العنوان الرئيسي والوصف */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          {/* صندوق العنوان الرئيسي */}
          <div className="inline-block p-2 px-8 rounded-full bg-gradient-to-r from-fuchsia to-royal shadow-lg shadow-fuchsia/40 mb-4">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                Our Team Members
            </h2>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-lavender">
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