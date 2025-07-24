// components/layout/footer.tsx
'use client';

import { motion } from 'framer-motion';
import { Heart, Coffee } from 'lucide-react';

interface FooterProps {
  translations: any;
}

export function Footer({ translations }: FooterProps) {
  const t = translations;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-10 py-8 px-6 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400 minecraft-text flex items-center justify-center gap-2">
          © 2024 CodeCraft Team. {t.footerText}
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <Coffee className="w-4 h-4 text-brown-500" />
        </p>
      </div>
    </motion.footer>
  );
}
