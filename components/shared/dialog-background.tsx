'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import { ParticleSystem } from './particle-system';

interface DialogBackgroundProps {
  children: React.ReactNode;
  type?: 'member' | 'project' | 'service';
}

export function DialogBackground({ children, type = 'member' }: DialogBackgroundProps) {
  const gradients = {
    member: 'from-purple-600 via-blue-600 to-cyan-600',
    project: 'from-green-600 via-teal-600 to-blue-600',
    service: 'from-orange-600 via-red-600 to-pink-600',
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradients[type]} p-1 rounded-lg`}>
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%',
        }}
      />
      {/* Particle effects */}
      <ParticleSystem count={10} />
      {/* Content */}
      <div className="relative z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg">
        {children}
      </div>
    </div>
  );
}
