'use client';
import { Aura3DObject } from '@/components/aura-3d-object';

interface HeroSectionProps {
  translations: any;
}

export function HeroSection({ translations }: HeroSectionProps) {
  const t = translations;

  return (
    <section className="pb-20 pt-10 px-6 relative overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <Aura3DObject size="w-64 h-[200px] " className="mx-auto" />
        </div>
        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white minecraft-font">
          {t.heroTitle}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 minecraft-text">
          "{t.heroSlogan}"
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-4xl mx-auto minecraft-text">
          {t.heroDescription}
        </p>
      </div>
    </section>
  );
}
