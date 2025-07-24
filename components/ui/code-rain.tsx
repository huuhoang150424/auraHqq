// Chức năng đặc sắc 4: Matrix Code Rain Effect
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code, X } from 'lucide-react';

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/~`';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ background: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Button
            onClick={() => setIsActive(false)}
            className="fixed top-4 right-4 z-40 minecraft-button pointer-events-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      <motion.div
        className="fixed bottom-44 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={() => setIsActive(true)}
          className="minecraft-button w-12 h-12 rounded-full"
          title="Matrix Code Rain"
        >
          <Code className="w-5 h-5" />
        </Button>
      </motion.div>
    </>
  );
}
