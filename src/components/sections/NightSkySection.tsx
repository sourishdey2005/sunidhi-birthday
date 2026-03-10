import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Text, Sparkles } from '@react-three/drei';
import { motion } from 'motion/react';

export const NightSkySection = () => {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.5} color="#fff" />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Text
                font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXDTjYgFE_.woff"
                fontSize={1.5}
                color="white"
                position={[0, 0, 0]}
                maxWidth={10}
                textAlign="center"
              >
                Some people shine like stars.
              </Text>
              <Text
                fontSize={0.6}
                color="rgba(255,255,255,0.4)"
                position={[0, -1.5, 0]}
                maxWidth={10}
                textAlign="center"
              >
                Even when they don’t realize it.
              </Text>
            </Float>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </section>
  );
};
