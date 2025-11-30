import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText"; // ✅ استيراد مكون HeroText
import ParallaxBackground from "../components/ParallaxBackground";
// import { Robot } from "../components/Robot";
import GLBTest from "../components/GLBTest";

import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
      id="home"
    >
      <HeroText /> {/* ✅ يتم عرض النص والزر من هنا */}
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
            <Suspense fallback={<Loader />}>
                
                <GLBTest 
                    scale={1.3} 
                    position={[1, -1, 0]} 
                    rotation={[0, 0, 0]} 
                />

                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                {/* يمكنك إضافة Rig هنا إذا أردت تحريك الكاميرا بالماوس */}

            </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

// وظيفة Rig لتحريك الكاميرا
function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;