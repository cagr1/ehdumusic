
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, PerspectiveCamera, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Fix for missing R3F intrinsic element types in JSX.IntrinsicElements
const Group = 'group' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

const LogoModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
    if (textRef.current) {
      textRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.7) * 0.5;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(
        meshRef.current.rotation,
        { z: Math.PI * 2 },
        { z: 0, duration: 2, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    // Updated from <group> to <Group> to fix JSX type error
    <Group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          ref={textRef}
          fontSize={1.2}
          color="#00F0FF"
          font="https://fonts.gstatic.com/s/syne/v15/8vIV7wUr_97p4A_Y-T_z1pW29WJz_w.woff"
          maxWidth={10}
          lineHeight={1}
          textAlign="center"
        >
          EHDU
          <MeshDistortMaterial
            color="#00F0FF"
            speed={3}
            distort={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </Text>
      </Float>
      
      {/* Abstract Background Elements */}
      <Sphere args={[2, 64, 64]} scale={2.5} rotation={[0.5, 0.5, 0.5]}>
        <MeshDistortMaterial
          color="#8B00FF"
          speed={1.5}
          distort={0.6}
          opacity={0.1}
          transparent
          wireframe
        />
      </Sphere>
    </Group>
  );
};

const LiquidLogo: React.FC = () => {
  return (
    <div className="w-full h-[60vh] md:h-screen animate-pulse-glow" style={{ borderRadius: '20px' }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Environment preset="city" />
        {/* Updated light tags to capitalized component variables to fix JSX type errors */}
        <AmbientLight intensity={0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#8B00FF" />
        <PointLight position={[-10, -10, -10]} intensity={1} color="#00F0FF" />
        <LogoModel />
      </Canvas>
    </div>
  );
};

export default LiquidLogo;
