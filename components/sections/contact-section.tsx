// components/sections/contact-section.tsx
'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ParticleSystem } from '@/components/shared/particle-system';
import { Mail, Users, BookOpen, Rocket } from 'lucide-react';

interface ContactSectionProps {
  translations: any;
}

export function ContactSection({ translations }: ContactSectionProps) {
  const t = translations;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t.messageSentSuccessfully); // Using translation for alert
    setFormData({ name: '', email: '', message: '' });
  };

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
        <motion.h3
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3"
        >
          <Mail className="w-8 h-8 text-blue-500" />
          {t.contactTitle}
          <Mail className="w-8 h-8 text-blue-500" />
        </motion.h3>
        <Card className="minecraft-card relative overflow-hidden">
          <ParticleSystem count={8} />
          <CardContent className="p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 minecraft-text flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t.contactName}
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="minecraft-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 minecraft-text flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t.contactEmail}
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="minecraft-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 minecraft-text flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {t.contactMessage}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="minecraft-input"
                  required
                />
              </div>
              <Button type="submit" className="w-full minecraft-button">
                <Rocket className="w-4 h-4 mr-2" />
                {t.sendMessage}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
