'use client';

import { useEffect, useRef } from 'react';

interface OptimizedParticleSystemProps {
  count?: number;
  enabled?: boolean;
}

export function OptimizedParticleSystem({
  count = 10,
  enabled = true,
}: OptimizedParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }>
  >([]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 2 - 1,
      life: 0,
      maxLife: Math.random() * 100 + 50,
    }));

    let lastTime = 0;
    const targetFPS = 30; // Giảm FPS để tối ưu

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < 1000 / targetFPS) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        if (particle.life > particle.maxLife || particle.y < -10) {
          // Reset particle
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + 10;
          particle.life = 0;
        }

        const alpha = 1 - particle.life / particle.maxLife;
        ctx.fillStyle = `rgba(255, 215, 0, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [count, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
