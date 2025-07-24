'use client';

import { motion } from 'framer-motion';
import type React from 'react';

interface MinecraftCubeProps {
  children: React.ReactNode;
  size?: string;
  className?: string;
  delay?: number;
  optimized?: boolean;
}

export function MinecraftCube({
  children,
  size = 'w-32 h-32',
  className = '',
  delay = 0,
  optimized = false,
}: MinecraftCubeProps) {
  return (
    <motion.div
      className={`relative ${size} minecraft-cube-border overflow-hidden flex items-center justify-center ${className}`}
      animate={optimized ? { rotateY: [0, 360] } : { rotateY: 360 }}
      transition={
        optimized
          ? {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
              delay: delay,
            }
          : {
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
              delay: delay,
            }
      }
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Inner content (image) */}
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)`,
          backgroundSize: '8px 8px',
        }}
      />
    </motion.div>
  );
}
