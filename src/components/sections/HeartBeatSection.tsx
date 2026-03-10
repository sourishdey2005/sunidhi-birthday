import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, ContactShadows, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';

const PulsingHeart = ({ speed, onPointerDown }: { speed: number, onPointerDown: () => void }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    shape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    shape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    shape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Pulse effect
    const pulse = 1 + Math.sin(t * speed) * 0.1;
    mesh.current.scale.set(pulse, pulse, pulse);
    
    // Gentle rotation
    mesh.current.rotation.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <mesh 
      ref={mesh} 
      rotation={[Math.PI, 0, 0]} 
      onPointerDown={onPointerDown}
      style={{ cursor: 'pointer' }}
    >
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <MeshDistortMaterial
        color="#f43f5e"
        speed={speed * 0.5}
        distort={0.3}
        radius={1}
        emissive="#880808"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

export const HeartBeatSection = () => {
  const [beatSpeed, setBeatSpeed] = useState(3);
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = () => {
    setBeatSpeed((prev) => Math.min(prev + 2, 15));
    setClickCount((prev) => prev + 1);
    
    // Reset speed after a delay
    setTimeout(() => {
      setBeatSpeed((prev) => Math.max(prev - 2, 3));
    }, 2000);
  };

  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <PulsingHeart speed={beatSpeed} onPointerDown={handleHeartClick} />
          </Float>

          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="text-rose-500 font-mono text-[10px] uppercase tracking-[0.6em] block">
            Interactive Heart
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Beating Just For You
          </h2>
          <p className="text-white/40 text-lg italic serif">
            Click the heart to feel the rhythm of my love.
          </p>
        </motion.div>

        <AnimatePresence>
          {clickCount > 0 && (
            <motion.div
              key={clickCount}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1.5, y: -100 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 font-bold text-2xl"
            >
              ❤️
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-20 text-white/20 text-[10px] uppercase tracking-[0.3em]"
      >
        Tap the heart
      </motion.div>
    </section>
  );
};
