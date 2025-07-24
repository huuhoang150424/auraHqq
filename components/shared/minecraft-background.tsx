'use client';

import { useEffect, useState } from 'react';

export function MinecraftBackground() {
  const [blocks, setBlocks] = useState<
    Array<{ id: number; x: number; y: number; type: string; opacity: number }>
  >([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const generateBlocks = () => {
      const blockTypes = ['grass', 'stone', 'dirt', 'wood', 'diamond', 'gold'];
      const newBlocks = [];

      for (let i = 0; i < 20; i++) {
        newBlocks.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
          opacity: Math.random() * 0.2 + 0.05,
        });
      }
      setBlocks(newBlocks);
    };
    generateBlocks();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Minecraft Grid Pattern based on theme */}
      <div className={isDarkMode ? 'minecraft-dark-grid' : 'minecraft-light-grid'}></div>

      {/* Floating Minecraft Blocks */}
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`absolute minecraft-block minecraft-block-${block.type} floating-block-smooth`}
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            opacity: block.opacity,
            animationDelay: `${block.id * 0.8}s`,
          }}
        />
      ))}

      {/* Aura Particles */}
      <div className="aura-particles">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="aura-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
