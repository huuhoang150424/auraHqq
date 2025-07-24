'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FloatingIconProps {
  icon: LucideIcon;
  delay?: number;
  color?: string;
  position?: string;
  size?: string;
  optimized?: boolean;
}

export function FloatingIcon({
  icon: Icon,
  delay = 0,
  color = 'blue',
  position = 'top-1/4 left-1/4',
  size = 'w-8 h-8',
  optimized = false,
}: FloatingIconProps) {
  return (
    <motion.div
      className={`absolute ${position} text-${color}-400 opacity-20`}
      animate={
        optimized
          ? {
              y: [-20, 20, -20], // Giảm amplitude
              rotate: [0, 180, 360], // Giảm rotation
              scale: [0.9, 1.1, 0.9], // Giảm scale change
            }
          : {
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }
      }
      transition={{
        duration: optimized ? 12 : 8, // Chậm hơn khi tối ưu
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
      style={{
        willChange: 'transform',
      }}
    >
      <Icon className={size} />
    </motion.div>
  );
}
