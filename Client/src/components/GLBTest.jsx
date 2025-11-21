// src/components/GLBTest.jsx
import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function GLBTest(props) {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/robot_playground.glb");
  const { actions } = useAnimations(animations, group);

  // تشغيل الأنيميشن الأساسي
  useEffect(() => {
    if (actions && actions.Experiment) {
      actions.Experiment.play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/robot_playground.glb");
