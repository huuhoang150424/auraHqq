'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ParticleSystem } from '@/components/shared/particle-system';
import { Gamepad2, Sparkles, Heart } from 'lucide-react';

interface PlaygroundSectionProps {
  translations: any;
}

const PlaygroundDemo = ({ translations }: { translations: any }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 relative">
      <ParticleSystem count={5} />
      <h4 className="font-bold minecraft-font flex items-center gap-2">
        <Gamepad2 className="w-5 h-5 text-purple-500" />
        Interactive Form Demo
      </h4>
      <Input
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="minecraft-input"
      />
      <Input
        placeholder="Your email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="minecraft-input"
      />
      <Button onClick={handleSubmit} className="minecraft-button w-full">
        <Sparkles className="w-4 h-4 mr-2" />
        Try Component
      </Button>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded minecraft-border relative overflow-hidden"
        >
          <ParticleSystem count={4} />
          <p className="minecraft-text relative z-10">
            🎉 Success! Hello {formData.name || 'there'}! Welcome to our playground! 🚀
          </p>
        </motion.div>
      )}
      {(formData.name || formData.email) && !showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded minecraft-border relative"
        >
          <div className="absolute top-2 right-2">
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <p className="minecraft-text">Hello {formData.name || 'there'}! 👋</p>
        </motion.div>
      )}
    </div>
  );
};

export function PlaygroundSection({ translations }: PlaygroundSectionProps) {
  const t = translations;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden"
    >
      <ParticleSystem count={10} />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3"
          >
            <Gamepad2 className="w-8 h-8 text-purple-500" />
            {t.playgroundTitle}
            <Gamepad2 className="w-8 h-8 text-purple-500" />
          </motion.h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 minecraft-text">
            {t.playgroundSubtitle}
          </p>
        </div>

        <Card className="minecraft-card relative overflow-hidden">
          <ParticleSystem count={8} />
          <CardContent className="p-8 relative z-10">
            <PlaygroundDemo translations={t} />
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
