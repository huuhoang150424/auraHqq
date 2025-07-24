'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface MinecraftCube3DProps {
  children: React.ReactNode;
  size?: string;
  className?: string;
  delay?: number;
}

export function MinecraftCube3D({
  children,
  size = 'w-32 h-32',
  className = '',
  delay = 0,
}: MinecraftCube3DProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cube = cubeRef.current;
    const container = containerRef.current;
    if (!cube || !container) return;

    let animationId: number;
    let baseRotationY = 0;
    let baseRotationX = -15;

    const animate = () => {
      if (!isHovered) {
        baseRotationY += 0.5;
      }

      const mouseInfluenceX = isHovered ? (mousePosition.y - 0.5) * 40 : 0;
      const mouseInfluenceY = isHovered ? (mousePosition.x - 0.5) * 40 : 0;

      const finalRotationX = baseRotationX + mouseInfluenceX;
      const finalRotationY = baseRotationY + mouseInfluenceY;

      cube.style.transform = `rotateX(${finalRotationX}deg) rotateY(${finalRotationY}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      baseRotationX = -15;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const timer = setTimeout(() => {
      animate();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay, isHovered, mousePosition]);

  return (
    <div
      ref={containerRef}
      className={`${size} ${className} perspective-1000 cursor-pointer relative`}
    >
      {/* Cube Shadow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-32 h-8 bg-black/20 rounded-full blur-md cube-shadow"></div>

      <div
        ref={cubeRef}
        className="relative w-full h-full preserve-3d realistic-cube-container"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Top Face - Lightest */}
        <div className="cube-face cube-top-realistic">
          <div className="cube-content-overlay">{children}</div>
        </div>

        {/* Front Face - Medium Light */}
        <div className="cube-face cube-front-realistic">
          <div className="cube-content-overlay">{children}</div>
        </div>

        {/* Right Face - Darkest */}
        <div className="cube-face cube-right-realistic">
          <div className="cube-content-overlay opacity-70">{children}</div>
        </div>

        {/* Left Face - Hidden in this angle */}
        <div className="cube-face cube-left-realistic">
          <div className="cube-content-overlay opacity-50">{children}</div>
        </div>

        {/* Back Face - Hidden */}
        <div className="cube-face cube-back-realistic">
          <div className="cube-content-overlay opacity-30">{children}</div>
        </div>

        {/* Bottom Face - Hidden */}
        <div className="cube-face cube-bottom-realistic">
          <div className="cube-content-overlay opacity-30">{children}</div>
        </div>

        {/* Main Content Display */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
