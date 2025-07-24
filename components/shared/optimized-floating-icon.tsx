'use client';

import { useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface OptimizedFloatingIconProps {
  icon: LucideIcon;
  delay?: number;
  color?: string;
  position?: string;
  size?: string;
}

export function OptimizedFloatingIcon({
  icon: Icon,
  delay = 0,
  color = 'blue',
  position = 'top-1/4 left-1/4',
  size = 'w-8 h-8',
}: OptimizedFloatingIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.02; // Chậm hơn
      const y = Math.sin(time) * 20;
      const x = Math.cos(time * 0.5) * 10;
      const rotate = Math.sin(time * 0.3) * 15;

      icon.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      animate();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [delay]);

  return (
    <div
      ref={iconRef}
      className={`absolute ${position} text-${color}-400 opacity-30`}
      style={{ willChange: 'transform' }}
    >
      <Icon className={size} />
    </div>
  );
}
