'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ParticleSystem } from '@/components/shared/particle-system';
import { DialogBackground } from '@/components/shared/dialog-background';
import Image from 'next/image';
import {
  Crown,
  Gem,
  Users,
  CheckCircle,
  Github,
  Linkedin,
  Code,
  Star,
  BookOpen,
  Zap,
  Target,
  Sparkles,
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills: string[];
  avatar: string;
  github: string;
  linkedin: string;
  bio: string;
  projects: string[];
  experience: string;
  achievements: string[];
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
  translations: any;
}

export function TeamSection({ teamMembers, translations }: TeamSectionProps) {
  const t = translations;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden"
      id="team"
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
          <Crown className="w-8 h-8 text-yellow-500" />
          {t.teamTitle}
          <Crown className="w-8 h-8 text-yellow-500" />
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, type: 'spring' }}
              viewport={{ once: true }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="minecraft-card hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    <ParticleSystem count={5} />
                    <CardHeader className="text-center relative z-10">
                      <div className="mx-auto mb-4 relative w-32 h-32">
                        <Image
                          src={member.avatar || '/placeholder.svg'}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="rounded-full border-4 border-gray-300 dark:border-gray-600 minecraft-border object-cover w-full h-full"
                        />
                        <motion.div
                          className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                      <CardTitle className="minecraft-font flex items-center justify-center gap-2">
                        {member.name}
                        <Gem className="w-4 h-4 text-yellow-500" />
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 minecraft-text">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="minecraft-badge">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full minecraft-button">
                        <Users className="w-4 h-4 mr-2" />
                        {t.viewProfile}
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogBackground type="member">
                    <div className="p-6">
                      <DialogHeader className="mb-6">
                        <DialogTitle className="minecraft-font text-3xl flex items-center gap-3">
                          <Crown className="w-8 h-8 text-yellow-500" />
                          {member.name}
                          <Crown className="w-8 h-8 text-yellow-500" />
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="relative w-48 h-48">
                            <Image
                              src={member.avatar || '/placeholder.svg'}
                              alt={member.name}
                              width={192}
                              height={192}
                              className="rounded-full border-4 border-white dark:border-gray-800 minecraft-border object-cover w-full h-full"
                            />
                            <motion.div
                              className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: 'linear',
                              }}
                            >
                              <Code className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold minecraft-font text-xl mb-2 flex items-center gap-2">
                              <Code className="w-6 h-6" />
                              {member.role}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 minecraft-text mb-4">
                              <Star className="w-4 h-4 inline mr-1" />
                              {member.experience}
                            </p>
                            <div className="flex gap-4">
                              <motion.a
                                href={member.github}
                                className="minecraft-button inline-flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                              </motion.a>
                              <motion.a
                                href={member.linkedin}
                                className="minecraft-button inline-flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                              </motion.a>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="minecraft-card p-4 relative overflow-hidden">
                            <ParticleSystem count={3} />
                            <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                              <BookOpen className="w-5 h-5 text-blue-500" />
                              Bio
                            </h5>
                            <p className="minecraft-text relative z-10">{member.bio}</p>
                          </div>

                          <div className="minecraft-card p-4 relative overflow-hidden">
                            <ParticleSystem count={3} />
                            <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                              <Zap className="w-5 h-5 text-purple-500" />
                              Skills
                            </h5>
                            <div className="flex flex-wrap gap-2 relative z-10">
                              {member.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="minecraft-badge">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="minecraft-card p-4 relative overflow-hidden">
                          <ParticleSystem count={5} />
                          <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                            <Target className="w-5 h-5 text-green-500" />
                            Projects
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
                            {member.projects.map((project) => (
                              <div
                                key={project}
                                className="minecraft-card p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900"
                              >
                                <p className="minecraft-text flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {project}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="minecraft-card p-4 relative overflow-hidden">
                          <ParticleSystem count={5} />
                          <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            Achievements
                          </h5>
                          <div className="space-y-2 relative z-10">
                            {member.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="minecraft-text flex items-center gap-2 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded"
                              >
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                {achievement}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogBackground>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
