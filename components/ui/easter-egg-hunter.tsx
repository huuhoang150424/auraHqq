// Chức năng đặc sắc 3: Easter Egg Hunter
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Star, Trophy, X } from 'lucide-react';

export function EasterEggHunter() {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [isHunting, setIsHunting] = useState(false);

  const easterEggs = [
    {
      id: 'konami',
      name: 'Konami Code',
      description: 'Enter the famous cheat code!',
      trigger: 'konami',
    },
    {
      id: 'triple-click',
      name: 'Triple Clicker',
      description: 'Triple click the logo',
      trigger: 'click',
    },
    {
      id: 'scroll-master',
      name: 'Scroll Master',
      description: 'Scroll to bottom 3 times',
      trigger: 'scroll',
    },
    {
      id: 'theme-switcher',
      name: 'Theme Switcher',
      description: 'Switch themes 5 times',
      trigger: 'theme',
    },
  ];

  useEffect(() => {
    let konamiSequence = '';
    const konamiCode =
      'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    let scrollCount = 0;
    const themeCount = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence += e.code;
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence = konamiSequence.slice(-konamiCode.length);
      }
      if (konamiSequence === konamiCode) {
        unlockEgg('konami');
      }
    };

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        scrollCount++;
        if (scrollCount >= 3) {
          unlockEgg('scroll-master');
        }
      }
    };

    const unlockEgg = (eggId: string) => {
      if (!foundEggs.includes(eggId)) {
        setFoundEggs((prev) => [...prev, eggId]);
        const egg = easterEggs.find((e) => e.id === eggId);
        if (egg) {
          setShowAchievement(egg.name);
          setTimeout(() => setShowAchievement(null), 3000);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [foundEggs]);

  return (
    <>
      {/* Achievement Notification */}
      {showAchievement && (
        <motion.div
          className="fixed top-24 right-6 z-50"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
        >
          <Card className="minecraft-card bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="w-6 h-6" />
              <div>
                <div className="font-bold minecraft-font">Achievement Unlocked!</div>
                <div className="text-sm">{showAchievement}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Easter Egg Hunter Panel */}
      <motion.div
        className="fixed bottom-32 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsHunting(!isHunting)}
          className="minecraft-button w-12 h-12 rounded-full"
          title="Easter Egg Hunter"
        >
          <Gift className="w-5 h-5" />
          {foundEggs.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {foundEggs.length}
            </div>
          )}
        </Button>

        {isHunting && (
          <motion.div
            className="absolute bottom-16 right-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Card className="minecraft-card w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="minecraft-font text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Easter Eggs ({foundEggs.length}/{easterEggs.length})
                  </h3>
                  <Button
                    onClick={() => setIsHunting(false)}
                    variant="ghost"
                    size="sm"
                    className="p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {easterEggs.map((egg) => (
                    <div
                      key={egg.id}
                      className={`p-2 rounded minecraft-border ${
                        foundEggs.includes(egg.id)
                          ? 'bg-green-100 dark:bg-green-900'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {foundEggs.includes(egg.id) ? (
                          <Star className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <div className="w-4 h-4 border border-gray-400 rounded" />
                        )}
                        <div>
                          <div className="minecraft-font text-sm">{egg.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {egg.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
