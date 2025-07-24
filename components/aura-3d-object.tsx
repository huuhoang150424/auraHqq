'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Box, MeshDistortMaterial, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';

interface Aura3DObjectProps {
  size?: string;
  className?: string;
}

function AuraBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useFrame(() => {
    if (meshRef.current && !isInteracting) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <Box args={[1, 1, 1]} scale={3} ref={meshRef}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        emissive="#06b6d4"
        emissiveIntensity={0.6}
      />
    </Box>
  );
}

export function Aura3DObject({ size = 'w-64 h-64', className = '' }: Aura3DObjectProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <motion.div
      className={`relative ${size} ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <AuraBox />
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
