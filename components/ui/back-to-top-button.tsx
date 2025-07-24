// components/ui/back-to-top-button.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle } from 'lucide-react';

interface BackToTopButtonProps {
  language: string;
  translations: any;
}

export function BackToTopButton({ language, translations }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 minecraft-button p-3 rounded-full shadow-lg"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      aria-label={t.backToTop}
    >
      <ArrowUpCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
}
