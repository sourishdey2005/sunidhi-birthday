import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { FloatingHeart } from '../3d/FloatingHeart';
import * as THREE from 'three';

const Cake = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.5;
    group.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Base Layer */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.8, 32]} />
        <meshStandardMaterial color="#fce4ec" />
      </mesh>
      {/* Top Layer */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
        <meshStandardMaterial color="#f8bbd0" />
      </mesh>
      {/* Candle */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff9800" emissive="#ff5722" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Cake />
          </Float>

          <FloatingHeart position={[-2, 1.5, -1]} scale={0.4} color="#ff85a1" />
          <FloatingHeart position={[2.5, -1, -2]} scale={0.3} color="#fbb1bd" />
          <FloatingHeart position={[-3, -2, 0]} scale={0.5} color="#ff4d6d" />
          <FloatingHeart position={[3, 2, -1]} scale={0.4} color="#ff758f" />

          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-rose-500 font-mono text-sm tracking-[0.8em] uppercase mb-4 block"
          >
            Happy Birthday
          </motion.span>
          <h2 className="text-7xl md:text-[12rem] font-bold text-white tracking-tighter mb-4 leading-none">
            Sunidhi
          </h2>
          <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed italic serif">
            Some people are special because they change the atmosphere of every room they enter.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};
