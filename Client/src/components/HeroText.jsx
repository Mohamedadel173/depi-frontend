import { Link } from 'react-router-dom'; 
import { FlipWords } from "./FlipWords"; // استيراد مكون الكلمات المتحركة
import { motion } from "framer-motion"; // ✅ الاستيراد الموحد والصحيح للحركة

const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi Coder
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Start your journey <br /> Step by Step
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords // ✅ تم إدراج المكون هنا
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            With LuLu
          </motion.p>
        </div>
      </div>


      {/* زر Start Now - التنقل إلى /register */}
      <motion.div
          className="mt-8"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2 }}
        >
          <Link 
            to="/register" 
            className="
              bg-white/15 backdrop-blur-lg border-2 border-white/50 rounded-full text-white px-10 py-4 text-lg font-semibold cursor-pointer 
              transition-all duration-300 ease-in-out tracking-wide hover:bg-white/25 hover:border-white 
              hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 mx-16 "
          >
            Start Now
          </Link>
        </motion.div>
              
      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        {/* ... */}
      </div>
    </div>
  );
};

export default HeroText;