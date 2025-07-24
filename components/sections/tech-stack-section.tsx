'use client';

import Image from 'next/image';
import { Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface TechIcon {
  name: string;
  image: string;
  color: string;
}

interface TechStackSectionProps {
  techIcons: TechIcon[];
  translations: any;
}

export function TechStackSection({ techIcons, translations }: TechStackSectionProps) {
  const t = translations;
  const scrollContainer1Ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const scrollContainer2Ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const scrollInterval1Ref = useRef<NodeJS.Timeout | null>(null);
  const scrollInterval2Ref = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Chia tech icons thành 2 hàng
  const midPoint = Math.ceil(techIcons.length / 2);
  const firstRow = techIcons.slice(0, midPoint);
  const secondRow = techIcons.slice(midPoint);

  const startAutoScroll = () => {
    // Hàng 1: cuộn từ trái sang phải
    if (scrollContainer1Ref.current && scrollInterval1Ref.current === null) {
      scrollInterval1Ref.current = setInterval(() => {
        const container = scrollContainer1Ref.current;
        if (container) {
          const scrollAmount = 1;
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += scrollAmount;
          }
        }
      }, 20);
    }

    // Hàng 2: cuộn từ phải sang trái
    if (scrollContainer2Ref.current && scrollInterval2Ref.current === null) {
      scrollInterval2Ref.current = setInterval(() => {
        const container = scrollContainer2Ref.current;
        if (container) {
          const scrollAmount = 1;
          if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth - container.clientWidth;
          } else {
            container.scrollLeft -= scrollAmount;
          }
        }
      }, 20);
    }
  };

  const stopAutoScroll = () => {
    if (scrollInterval1Ref.current) {
      clearInterval(scrollInterval1Ref.current);
      scrollInterval1Ref.current = null;
    }
    if (scrollInterval2Ref.current) {
      clearInterval(scrollInterval2Ref.current);
      scrollInterval2Ref.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }, [isHovered]);

  const renderTechRow = (techs: TechIcon[], ref: React.RefObject<HTMLDivElement>) => (
    <div
      ref={ref}
      className="flex overflow-x-auto pb-4 scrollbar-hide mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-6 pr-6">
        {/* Nhân đôi items để tạo hiệu ứng vô hạn */}
        {[...techs, ...techs, ...techs].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 minecraft-card p-4 text-center hover:scale-105 transition-transform duration-300"
            style={{ minWidth: '120px' }}
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-3 w-16 h-16 flex items-center justify-center">
                <Image
                  src={tech.image || ''}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-contain"
                />
              </div>
              <span className="text-sm font-medium minecraft-text">{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-0 relative overflow-hidden" id="tech">
      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-yellow-500" />
          {t.techTitle}
          <Zap className="w-8 h-8 text-yellow-500" />
        </h3>

        {renderTechRow(firstRow, scrollContainer1Ref)}
        {renderTechRow(secondRow, scrollContainer2Ref)}
      </div>
    </section>
  );
}
