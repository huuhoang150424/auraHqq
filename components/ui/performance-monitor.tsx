// Chức năng đặc sắc 2: Performance Monitor
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, X } from 'lucide-react';

export function PerformanceMonitor() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024));
      }
    };

    const measureLoadTime = () => {
      const navigation = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        setLoadTime(Math.round(navigation.loadEventEnd - navigation.startTime));
      }
    };

    measureFPS();
    measureMemory();
    measureLoadTime();

    const interval = setInterval(measureMemory, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) {
    return (
      <motion.div
        className="fixed top-20 left-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className="minecraft-button bg-white/90 dark:bg-gray-800/90"
          title="Performance Monitor"
        >
          <Activity className="w-4 h-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed top-20 left-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Card className="minecraft-card w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="minecraft-font text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Performance
            </h3>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="p-1">
              <X className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-2 text-xs minecraft-text">
            <div className="flex justify-between">
              <span>FPS:</span>
              <span
                className={
                  fps < 30 ? 'text-red-500' : fps < 50 ? 'text-yellow-500' : 'text-green-500'
                }
              >
                {fps}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span>{memoryUsage} MB</span>
            </div>
            <div className="flex justify-between">
              <span>Load Time:</span>
              <span>{loadTime} ms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
