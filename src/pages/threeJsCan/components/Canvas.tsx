import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Center } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CocaColaCan() {
  const { scene } = useGLTF("/models/coca_cola_can.glb");
  const canRef = useRef<Group>(null);

  useEffect(() => {
    if (!canRef.current) return;

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: ".details-section",
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        markers: true
      },
    });

    gsap.to(canRef.current.position, {
      x: -1.2,
      y: -0.7,
      scrollTrigger: {
        trigger: ".details-section",
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        markers: true
      },
    });
  }, []);

  return (
    <Center>
      <primitive
        ref={canRef}
        object={scene}
        scale={0.8}
        rotation={[0, Math.PI, 0]}
      />
    </Center>
  );
}

export default function Canvas() {
  return (
    <div className="w-full h-screen fixed top-0 left-0 pointer-events-none">
      <ThreeCanvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        {/* Model */}
        <CocaColaCan />

        {/* Optional controls (disable in production) */}
        <OrbitControls enableZoom={false} enableRotate={false} />

        <Environment preset="studio" />
      </ThreeCanvas>
    </div>
  );
}

useGLTF.preload("/models/coca_cola_can.glb");
