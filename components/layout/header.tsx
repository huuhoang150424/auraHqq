'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages, Blocks, Sparkles, Download, Bell } from 'lucide-react'; // Import Blocks icon

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  themeStyle: string;
  setThemeStyle: (style: string) => void;
  translations: any;
  downloadPDF: () => void;
}

export function Header({
  language,
  setLanguage,
  theme,
  setTheme,
  themeStyle,
  setThemeStyle,
  translations,
  downloadPDF,
}: HeaderProps) {
  const t = translations;
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New project completed!', type: 'success', time: '2 min ago' },
    { id: 2, message: 'Team meeting at 3 PM', type: 'info', time: '1 hour ago' },
    { id: 3, message: 'Client feedback received', type: 'warning', time: '3 hours ago' },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 border-b border-gray-200 dark:border-gray-700 bg-black/80 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div className="flex items-center gap-4">
          {/* Aura Logo */}
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg overflow-hidden aura-glow"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(147, 51, 234, 0.8)',
                    '0 0 40px rgba(59, 130, 246, 0.8)',
                    '0 0 30px rgba(6, 182, 212, 0.8)',
                    '0 0 20px rgba(147, 51, 234, 0.8)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-white font-bold text-xl minecraft-font">A</div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-xl font-bold text-white minecraft-font aura-text"
            whileHover={{ scale: 1.05 }}
          >
            ✨ Aura Team
          </motion.h1>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: 'Team', href: '#team' },
            { name: 'Projects', href: '#projects' },
            { name: 'Services', href: '#services' },
            { name: 'Tech', href: '#tech' },
            { name: 'Testimonials', href: '#testimonials' },
            { name: 'Contact', href: '#contact' },
          ].map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="minecraft-text text-white hover:text-cyan-400 transition-colors cursor-pointer nav-item-aura"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-white" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="minecraft-input text-sm p-1 bg-black/80 text-white border-cyan-400"
            >
              <option value="en">EN</option>
              <option value="vi">VI</option>
            </select>
          </div>

          {/* Theme Switchers */}
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            size="icon"
            className="minecraft-button bg-black/80 border-cyan-400 text-white"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            onClick={() => setThemeStyle(themeStyle === 'tech' ? 'casual' : 'tech')}
            className="minecraft-button" // Áp dụng class minecraft-button
          >
            {themeStyle === 'tech' ? (
              <Blocks className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>

          {/* Notification System */}
          <div className="relative">
            <Button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              variant="outline"
              size="icon"
              className="minecraft-button bg-black/80 border-cyan-400 text-white relative"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                />
              )}
            </Button>

            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-12 right-0 w-80"
              >
                <Card className="minecraft-card bg-black/95 backdrop-blur-md border-cyan-400">
                  <CardHeader className="p-4 border-b border-cyan-400">
                    <CardTitle className="minecraft-font text-lg flex items-center gap-2 text-white">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 max-h-60 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border-b border-gray-700 hover:bg-gray-800/50"
                      >
                        <p className="minecraft-text text-sm text-white">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Enhanced PDF Download Button */}
          <Button
            onClick={downloadPDF}
            className="minecraft-button bg-gradient-to-r from-purple-500 to-cyan-400"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
