'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ParticleSystem } from '@/components/shared/particle-system';
import { Heart } from 'lucide-react';

interface TestimonialsSectionProps {
  translations: any;
}

export function TestimonialsSection({ translations }: TestimonialsSectionProps) {
  const t = translations;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden"
      id="testimonials"
    >
      <ParticleSystem count={10} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h3
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3"
        >
          <Heart className="w-8 h-8 text-red-500" />
          {t.testimonialsTitle}
          <Heart className="w-8 h-8 text-red-500" />
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="minecraft-card p-6 text-center relative overflow-hidden">
            <ParticleSystem count={3} />
            <p className="minecraft-text italic mb-4 relative z-10">
              "CodeCraft Team delivered an outstanding website! Their attention to detail and
              creative solutions exceeded our expectations."
            </p>
            <p className="font-bold minecraft-font relative z-10">
              - John Doe, CEO of Example Corp
            </p>
          </Card>
          <Card className="minecraft-card p-6 text-center relative overflow-hidden">
            <ParticleSystem count={3} />
            <p className="minecraft-text italic mb-4 relative z-10">
              "Professional, responsive, and truly talented. Our mobile app is a huge success thanks
              to CodeCraft!"
            </p>
            <p className="font-bold minecraft-font relative z-10">
              - Jane Smith, Founder of App Innovations
            </p>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
