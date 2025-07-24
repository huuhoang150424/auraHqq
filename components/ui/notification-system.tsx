// components/ui/notification-system.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

interface NotificationSystemProps {
  language: string;
  translations: any;
}

export function NotificationSystem({ language, translations }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New project completed!', type: 'success', time: '2 min ago' },
    { id: 2, message: 'Team meeting at 3 PM', type: 'info', time: '1 hour ago' },
    { id: 3, message: 'Client feedback received', type: 'warning', time: '3 hours ago' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const t = translations;

  return (
    <div className="fixed top-20 right-6 z-40">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="minecraft-button bg-white/90 dark:bg-gray-800/90 relative"
      >
        <Bell className="w-4 h-4" />
        {notifications.length > 0 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-12 right-0 w-80"
        >
          <Card className="minecraft-card bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <CardHeader className="p-4 border-b">
              <CardTitle className="minecraft-font text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t.notifications}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-60 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <p className="minecraft-text text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
