'use client';

import { Target, Heart, Users, Star } from 'lucide-react';
import { AnimatedCounter } from '@/components/shared/animated-counter';

interface KpiSectionProps {
  translations: any;
}

export function KpiSection({ translations }: KpiSectionProps) {
  const t = translations;

  const kpiItems = [
    { end: 12, suffix: '+', text: t.kpiProjects, color: 'blue', icon: Target },
    { end: 98, suffix: '%', text: t.kpiSatisfaction, color: 'green', icon: Heart },
    { end: 7, suffix: '', text: t.kpiMembers, color: 'purple', icon: Users },
    { end: 5, suffix: '+', text: t.kpiExperience, color: 'orange', icon: Star },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpiItems.map((item, index) => (
            <div
              key={index}
              className="text-center minecraft-card p-6 relative overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`text-4xl font-bold text-${item.color}-600 dark:text-${item.color}-400 minecraft-font relative z-10`}
              >
                <AnimatedCounter end={item.end} suffix={item.suffix} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 minecraft-text relative z-10">
                {item.text}
              </p>
              <item.icon
                className={`absolute top-2 right-2 w-6 h-6 text-${item.color}-300 opacity-50`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
