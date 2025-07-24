// components/sections/blog-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParticleSystem } from '@/components/shared/particle-system';
import { BookOpen, Calendar, Sparkles, Coffee } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
  translations: any;
}

export function BlogSection({ blogPosts, translations }: BlogSectionProps) {
  const t = translations;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-6 relative overflow-hidden"
    >
      <ParticleSystem count={15} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h3
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3"
        >
          <BookOpen className="w-8 h-8 text-green-500" />
          {t.blogTitle}
          <BookOpen className="w-8 h-8 text-green-500" />
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="minecraft-card h-full relative overflow-hidden">
                <ParticleSystem count={5} />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="minecraft-text">{post.date}</span>
                    <Badge variant="outline" className="minecraft-badge">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="minecraft-font text-lg flex items-center gap-2">
                    {post.title}
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 minecraft-text">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 minecraft-text flex items-center gap-1">
                      <Coffee className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    <Button variant="outline" size="sm" className="minecraft-button bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t.readMore}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
