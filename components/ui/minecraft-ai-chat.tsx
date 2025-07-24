// components/ui/minecraft-ai-chat.tsx
'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Bot, X, Minimize2, Maximize2, Send, Sparkles } from 'lucide-react';

interface MinecraftAIChatProps {
  language: string;
  theme: string;
  translations: any;
}

export function MinecraftAIChat({ language, theme, translations }: MinecraftAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content:
        language === 'en'
          ? "🤖 Hello! I'm CodeCraft AI Assistant. Ask me anything about our team, projects, or services!"
          : '🤖 Xin chào! Tôi là AI Assistant của CodeCraft. Hỏi tôi bất cứ điều gì về đội ngũ, dự án hoặc dịch vụ!',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses =
        language === 'en'
          ? [
              '🚀 Our team specializes in modern web development using React, Node.js, and cutting-edge technologies!',
              '💼 We offer three main service packages: Landing Pages (3M VND), Web Apps (12M VND), and Mobile Apps (custom pricing).',
              '👥 Our team consists of 7 full-time members with 5+ years of experience and 98% customer satisfaction!',
              "🎯 We've completed 12+ successful projects ranging from e-commerce platforms to AI-powered analytics.",
              '⚡ Our tech stack includes React, Node.js, Laravel, MongoDB, TypeScript, and modern design tools like Figma.',
              '🎮 We love Minecraft-inspired design and creating engaging user experiences!',
              '📧 Feel free to contact us through our contact form or check out our portfolio!',
            ]
          : [
              '🚀 Đội ngũ chúng tôi chuyên về phát triển web hiện đại sử dụng React, Node.js và các công nghệ tiên tiến!',
              '💼 Chúng tôi cung cấp ba gói dịch vụ chính: Landing Page (3 triệu VND), Web App (12 triệu VND), và Mobile App (báo giá riêng).',
              '👥 Đội ngũ gồm 7 thành viên full-time với 5+ năm kinh nghiệm và 98% khách hàng hài lòng!',
              '🎯 Chúng tôi đã hoàn thành 12+ dự án thành công từ nền tảng thương mại điện tử đến phân tích AI.',
              '⚡ Tech stack của chúng tôi bao gồm React, Node.js, Laravel, MongoDB, TypeScript và các công cụ thiết kế hiện đại như Figma.',
              '🎮 Chúng tôi yêu thích thiết kế phong cách Minecraft và tạo ra trải nghiệm người dùng hấp dẫn!',
              '📧 Hãy liên hệ với chúng tôi qua form liên hệ hoặc xem portfolio của chúng tôi!',
            ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="minecraft-button w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white border-0 shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          >
            <Bot className="w-8 h-8" />
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Card
        className={`minecraft-card w-96 ${isMinimized ? 'h-16' : 'h-[500px]'} bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-4 border-blue-500`}
      >
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
              >
                <Bot className="w-6 h-6" />
              </motion.div>
              <div>
                <h3 className="minecraft-font text-lg">{t.chatWithAI}</h3>
                <p className="text-xs opacity-80">CodeCraft AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsMinimized(!isMinimized)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-4 h-80 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg minecraft-border ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white minecraft-card'
                        : 'bg-gray-100 dark:bg-gray-800 minecraft-card'
                    }`}
                  >
                    <p className="minecraft-text text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg minecraft-border minecraft-card">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }}
                      >
                        <Bot className="w-4 h-4" />
                      </motion.div>
                      <p className="minecraft-text text-sm">{t.aiTyping}</p>
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.askAnything}
                  className="minecraft-input flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="minecraft-button bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
}
