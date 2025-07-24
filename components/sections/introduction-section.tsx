'use client';

import { Sparkles } from 'lucide-react';

interface IntroductionSectionProps {
  translations: any;
}

export function IntroductionSection({ translations }: IntroductionSectionProps) {
  const t = translations;

  return (
    <section
      className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden"
      id="intro"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          {t.introTitle}
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto minecraft-text">
          {t.introContent}
        </p>
      </div>
    </section>
  );
}
