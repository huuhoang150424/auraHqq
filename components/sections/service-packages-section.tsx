'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParticleSystem } from '@/components/shared/particle-system';
import { Gem, Sparkles, Crown, CheckCircle, Rocket } from 'lucide-react';

interface ServicePackage {
  name: string;
  price: string;
  features: string[];
  popular: boolean;
  icon: React.ElementType;
  color: string;
}

interface ServicePackagesSectionProps {
  servicePackages: ServicePackage[];
  translations: any;
  language: string;
}

export function ServicePackagesSection({
  servicePackages,
  translations,
  language,
}: ServicePackagesSectionProps) {
  const t = translations;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden"
      id="services"
    >
      <ParticleSystem count={15} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3"
          >
            <Gem className="w-8 h-8 text-purple-500" />
            {t.servicesTitle}
            <Gem className="w-8 h-8 text-purple-500" />
          </motion.h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 minecraft-text">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicePackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card
                className={`minecraft-card relative overflow-hidden ${pkg.popular ? 'ring-4 ring-purple-500' : ''}`}
              >
                <ParticleSystem count={pkg.popular ? 8 : 5} />
                {pkg.popular && (
                  <motion.div
                    className="absolute top-4 right-2  z-20"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge className="minecraft-badge bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      {language === 'en' ? 'Most Popular' : 'Phổ Biến Nhất'}
                    </Badge>
                  </motion.div>
                )}
                <CardHeader className="text-center relative z-10">
                  <div className="mb-4 flex justify-center">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br from-${pkg.color}-400 to-${pkg.color}-600 rounded-full flex items-center justify-center`}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                    >
                      {React.createElement(pkg.icon)}
                    </motion.div>
                  </div>
                  <CardTitle className="minecraft-font text-xl flex items-center justify-center gap-2">
                    {pkg.name}
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 minecraft-font">
                    {pkg.price}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2 minecraft-text"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="w-full minecraft-button">
                    <Rocket className="w-4 h-4 mr-2" />
                    {t.getQuote}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
