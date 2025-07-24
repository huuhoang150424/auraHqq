'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ParticleSystemProps {
  count?: number;
  optimized?: boolean;
}

export function ParticleSystem({ count = 20, optimized = false }: ParticleSystemProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const particleCount = optimized ? Math.min(count, 10) : count;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: optimized ? 4 + Math.random() * 2 : 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [count, optimized]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            willChange: 'transform',
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
