// Chức năng đặc sắc 1: Theme Customizer
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Palette, X, RotateCcw } from 'lucide-react';

interface ThemeCustomizerProps {
  onThemeChange: (theme: any) => void;
}

export function ThemeCustomizer({ onThemeChange }: ThemeCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customTheme, setCustomTheme] = useState({
    primaryHue: 220,
    saturation: 70,
    brightness: 50,
  });

  const applyTheme = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary-hue', customTheme.primaryHue.toString());
    root.style.setProperty('--primary-saturation', `${customTheme.saturation}%`);
    root.style.setProperty('--primary-brightness', `${customTheme.brightness}%`);

    onThemeChange(customTheme);
  };

  const resetTheme = () => {
    setCustomTheme({
      primaryHue: 220,
      saturation: 70,
      brightness: 50,
    });
    const root = document.documentElement;
    root.style.removeProperty('--primary-hue');
    root.style.removeProperty('--primary-saturation');
    root.style.removeProperty('--primary-brightness');
    root.style.removeProperty('--animation-speed');
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-[100px] right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="minecraft-button w-14 h-14 rounded-full"
          title="Theme Customizer"
        >
          <Palette className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-[100px] right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Card className="minecraft-card w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="minecraft-font text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Studio
          </CardTitle>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="p-1">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <label className="minecraft-text text-sm font-medium">Primary Color Hue</label>
            <Slider
              value={[customTheme.primaryHue]}
              onValueChange={(value) => {
                setCustomTheme((prev) => ({ ...prev, primaryHue: value[0] }));
                applyTheme();
              }}
              max={360}
              step={1}
              className="mt-2"
            />
            <div className="text-xs text-gray-500 mt-1">{customTheme.primaryHue}°</div>
          </div>

          <div>
            <label className="minecraft-text text-sm font-medium">Saturation</label>
            <Slider
              value={[customTheme.saturation]}
              onValueChange={(value) => {
                setCustomTheme((prev) => ({ ...prev, saturation: value[0] }));
                applyTheme();
              }}
              max={100}
              step={1}
              className="mt-2"
            />
            <div className="text-xs text-gray-500 mt-1">{customTheme.saturation}%</div>
          </div>


          <Button
            onClick={resetTheme}
            variant="outline"
            className="w-full minecraft-button bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
