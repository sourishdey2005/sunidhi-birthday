import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingHeart = ({ position = [0, 0, 0] as [number, number, number], scale = 1, color = "#ff4d6d" }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const { mouse, viewport } = useThree();

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
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smoothly follow mouse
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (mouse.x * Math.PI) / 4, 0.1);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, Math.PI + (mouse.y * Math.PI) / 4, 0.1);
    
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, position[1] + Math.sin(time) * 0.2, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.2}
          radius={1}
        />
      </mesh>
    </Float>
  );
};
