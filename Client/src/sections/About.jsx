import { useRef, useEffect, useState } from "react";
import * as THREE from 'three'; 

// ====================================================================
// المكونات الداخلية المدمجة لحل أخطاء الاستيراد
// ====================================================================

// 1. مكون TeamButton (زر الفريق)
const TeamButton = ({ 
    text = "اكتشف قادة فريقنا", 
    href = "/team", 
    className = "" 
}) => {
  return (
    <a
      href={href}
      // تصميم صغير وبلون بنفسجي/بنكي ليتناسق مع CTA
      className={`inline-flex items-center justify-center 
                 px-4 py-2 text-sm font-semibold rounded-full 
                 text-white transition-all duration-300
                 bg-purple-600/80 border border-purple-400
                 shadow-lg shadow-purple-500/30 
                 hover:bg-purple-700 hover:scale-[1.05] active:scale-[0.98] 
                 whitespace-nowrap ${className}`}
    >
      {/* أيقونة الفريق */}
      <svg className="w-4 h-4 ml-1 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87m-4-1.23a4 4 0 0 1 0-7.74" />
      </svg>
      {text}
    </a>
  );
};

// 2. مكون Card (للـ Grid 2 - محاكاة لـ Floating Tags)
const Card = ({ text, image, style, containerRef }) => {
    // استخدم placeholder بدلاً من المسارات المحلية المفقودة
    const placeholderImage = image 
        ? `https://placehold.co/40x40/${image.includes('csharp') ? 'f472b6' : image.includes('dotnet') ? 'c084fc' : 'fb923c'}/ffffff?text=${image.split('/')[2].substring(0,2).toUpperCase()}`
        : null;
        
    return (
        <div 
            className="absolute p-2 bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 
                       text-sm font-semibold text-white transform transition duration-500 hover:scale-110"
            style={style}
        >
            {placeholderImage ? (
                <img src={placeholderImage} alt="Logo" className="w-8 h-8 object-contain" />
            ) : (
                <span className="p-1 uppercase">{text}</span>
            )}
        </div>
    );
};

// 3. مكون Globe (للـ Grid 3 - رسوم متحركة 3D)
const Globe = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = 250; 
        const height = 250;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);
        
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x6366f1, // لون أزرق-بنفسجي
            wireframe: true 
        });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        camera.position.z = 2;

        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.005;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="w-[250px] h-[250px] flex items-center justify-center"></div>;
};

// 4. مكون CopyEmailButton (للـ Grid 4)
const CopyEmailButton = () => {
    const [copied, setCopied] = useState(false);
    const email = "contact@algoarcad.com";

    const handleCopy = () => {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(tempInput);
    };

    return (
        <button 
            onClick={handleCopy}
            className={`flex items-center justify-center 
                       px-6 py-3 text-lg font-bold rounded-full 
                       text-white transition-all duration-300 w-full md:w-auto
                       ${copied 
                           ? 'bg-green-500 shadow-green-500/50 hover:bg-green-600' 
                           : 'bg-indigo-600 shadow-indigo-600/50 hover:bg-indigo-700'
                       }
                       shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {copied ? 'تم النسخ!' : 'نسخ البريد الإلكتروني'}
        </button>
    );
};

// 5. مكون Frameworks (للـ Grid 5 - رسوم متحركة 3D)
const Frameworks = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshPhongMaterial({ color: 0x4ade80 }); // لون أخضر فاتح
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 2;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.005;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const currentWidth = mountRef.current.clientWidth;
            const currentHeight = mountRef.current.clientHeight;
            camera.aspect = currentWidth / currentHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentWidth, currentHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full"></div>;
};

// ====================================================================
// المكون الرئيسي About
// ====================================================================
const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About US</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 - (Col Span 3) */}
        <div className="flex items-end grid-default-color grid-1 relative overflow-hidden p-6 rounded-xl md:col-span-3">
          <img
            src="https://placehold.co/400x400/1e293b/cbd5e1?text=Coding+POV" // Placeholder for "assets/coding-pov.png"
            alt="Coding illustration"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">At ALGO ARCAD</p>
            <p className="subtext">
             We believe every child deserves the chance to explore programming in a fun and supportive way.
             our mission is to inspire kids from 9 to 16 to learn, play and create with code.
            </p>
          </div>
          {/* تم تعديل من 'from-indigo' إلى لون خلفية متناسق */}
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-[#1e293b]" />
        </div>
        {/* Grid 2 - (Col Span 2) */}
        <div className="grid-default-color grid-2 relative overflow-hidden p-6 rounded-xl md:col-span-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative"
          >
            <p className="flex items-end text-5xl text-gray-500 opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              ALGO ARCAD
            </p>
            <Card style={{ rotate: "75deg", top: "30%", left: "20%" }} text="Ai" containerRef={grid2Container} />
            <Card style={{ rotate: "-30deg", top: "60%", left: "45%" }} text="ML" containerRef={grid2Container} />
            <Card style={{ rotate: "65deg", bottom: "30%", left: "70%" }} text="HTML" containerRef={grid2Container} />
            <Card style={{ rotate: "-45deg", top: "55%", left: "0%" }} text="CSS" containerRef={grid2Container} />
            <Card style={{ rotate: "20deg", top: "10%", left: "38%" }} text="js" containerRef={grid2Container} />
            <Card style={{ rotate: "30deg", top: "70%", left: "70%" }} image="assets/logos/csharp-pink.png" containerRef={grid2Container} />
            <Card style={{ rotate: "-45deg", top: "70%", left: "25%" }} image="assets/logos/dotnet-pink.png" containerRef={grid2Container} />
            <Card style={{ rotate: "-45deg", top: "5%", left: "10%" }} image="assets/logos/blazor-pink.png" containerRef={grid2Container} />
          </div>
        </div>
        {/* Grid 3 - (Col Span 1) */}
        <div className="grid-black-color grid-3 relative overflow-hidden p-6 rounded-xl md:col-span-1">
          <div className="z-10 w-full text-center mt-4">
            <p className="headtext text-lg">Interactive Lessons</p>
            <p className="subtext text-xs mt-2">
              Our lessons include fun videos, interactive stories, and playful quizzes.
            </p>
          </div>
          <figure className="absolute left-[30%] top-[30%] opacity-75">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 - (Col Span 2) */}
        <div className="grid-special-color grid-4 relative overflow-hidden p-6 rounded-xl md:col-span-2">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start learning together?
            </p>
            <CopyEmailButton />
            
            {/* الزر الصغير الذي طلبته - تمت إضافته هنا */}
            <TeamButton 
                text="اكتشف قادة فريقنا" 
                href="/team" 
                className="mt-2"
            />

          </div>
        </div>
        {/* Grid 5 - (Col Span 4) */}
        <div className="grid-default-color grid-5 relative overflow-hidden p-6 rounded-xl md:col-span-4">
          <div className="z-10 w-[50%]">
            <p className="headtext">
            Learn in a Fun Way</p>
            <p className="subtext">
              Deliver educational content through games and interactive activities to make learning exciting for kids.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>

      {/* الأنماط المدمجة */}
      <style>{`
          .c-space {
              padding-left: 1rem;
              padding-right: 1rem;
          }
          .section-spacing {
              padding-top: 5rem;
              padding-bottom: 5rem;
              background-color: #0d142c; /* خلفية داكنة */
              color: white;
          }
          .text-heading {
              font-size: 2.5rem;
              font-weight: 800;
              text-align: center;
              margin-bottom: 2rem;
              color: #f87171; /* لون مميز */
          }
          .grid-default-color {
              background-color: #1e293b; 
              position: relative;
              overflow: hidden;
              border-radius: 0.75rem;
          }
          .grid-black-color {
              background-color: #020617;
              position: relative;
              overflow: hidden;
              border-radius: 0.75rem;
          }
          .grid-special-color {
              background-color: #4f46e5; /* indigo-600 */
              position: relative;
              overflow: hidden;
              border-radius: 0.75rem;
          }
          .headtext {
              font-size: 1.5rem;
              font-weight: 700;
              color: white;
          }
          .subtext {
              font-size: 0.875rem;
              color: #d1d5db;
              line-height: 1.5;
          }
      `}</style>
    </section>
  );
};

export default About;