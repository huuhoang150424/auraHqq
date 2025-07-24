'use client';

import { useState } from 'react';
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
import { ProjectSearchFilter } from '@/components/shared/project-search-filter';
import Image from 'next/image';
import {
  Rocket,
  Gem,
  Eye,
  ThumbsUp,
  Bookmark,
  Share2,
  Target,
  ExternalLink,
  Github,
  Layers,
  Calendar,
  Users,
  BookOpen,
  Code,
  Star,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
  category: string;
  duration: string;
  teamSize: string;
  features: string[];
  likes: number;
  views: number;
}

interface ProjectsSectionProps {
  projects: Project[];
  translations: any;
  language: string;
}

export function ProjectsSection({ projects, translations, language }: ProjectsSectionProps) {
  const t = translations;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(projects.map((p) => p.category))];

  const handleProjectLike = (projectId: number) => {
    // Handle like functionality
    console.log('Liked project:', projectId);
  };

  const handleProjectBookmark = (projectId: number) => {
    setBookmarkedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    );
  };

  const handleProjectShare = (project: Project) => {
    if (navigator.share) {
      navigator.share({
        title: project.name,
        text: project.description,
        url: project.demoLink,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(project.demoLink);
      alert(language === 'en' ? 'Link copied to clipboard!' : 'Đã sao chép link!');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-6 relative overflow-hidden"
      id="projects"
    >
      <ParticleSystem count={20} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h3
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3"
        >
          <Rocket className="w-8 h-8 text-blue-500" />
          {t.projectsTitle}
          <Rocket className="w-8 h-8 text-blue-500" />
        </motion.h3>

        {/* Search and Filter */}
        <ProjectSearchFilter
          language={language}
          onSearch={setSearchTerm}
          onFilter={setSelectedCategory}
          categories={categories}
          translations={t}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8, type: 'spring' }}
              viewport={{ once: true }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="minecraft-card hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    <ParticleSystem count={5} />
                    <CardHeader className="relative z-10 p-0">
                      <div className="relative">
                        <Image
                          src={project.image || '/placeholder.svg'}
                          alt={project.name}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg minecraft-border"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Badge variant="secondary" className="minecraft-badge bg-white/90">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-4 text-white text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {project.likes}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <CardTitle className="minecraft-font flex items-center gap-2">
                          {project.name}
                          <Gem className="w-4 h-4 text-cyan-500" />
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-0">
                      <p className="text-gray-600 dark:text-gray-400 mb-4 minecraft-text line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectLike(project.id);
                            }}
                            variant="outline"
                            size="sm"
                            className="minecraft-button"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectBookmark(project.id);
                            }}
                            variant="outline"
                            size="sm"
                            className={`minecraft-button ${bookmarkedProjects.includes(project.id) ? 'bg-yellow-100' : ''}`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectShare(project);
                            }}
                            variant="outline"
                            size="sm"
                            className="minecraft-button"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button className="w-full minecraft-button">
                        <Target className="w-4 h-4 mr-2" />
                        {t.viewProject}
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogBackground type="project">
                    <div className="p-6">
                      <DialogHeader className="mb-6">
                        <DialogTitle className="minecraft-font text-3xl flex items-center gap-3">
                          <Rocket className="w-8 h-8 text-blue-500" />
                          {project.name}
                          <Rocket className="w-8 h-8 text-blue-500" />
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="relative w-[400px] h-[300px]">
                            <Image
                              src={project.image || '/placeholder.svg'}
                              alt={project.name}
                              width={400}
                              height={300}
                              className="rounded-lg minecraft-border object-cover w-full h-full"
                            />
                            <motion.div
                              className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center"
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 6,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: 'linear',
                              }}
                            >
                              <Rocket className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                              <div className="minecraft-card p-3">
                                <span className="font-bold minecraft-font flex items-center gap-1">
                                  <Layers className="w-4 h-4" />
                                  Category:
                                </span>
                                <p className="minecraft-text">{project.category}</p>
                              </div>
                              <div className="minecraft-card p-3">
                                <span className="font-bold minecraft-font flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Duration:
                                </span>
                                <p className="minecraft-text">{project.duration}</p>
                              </div>
                              <div className="minecraft-card p-3">
                                <span className="font-bold minecraft-font flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  Team:
                                </span>
                                <p className="minecraft-text">{project.teamSize}</p>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <motion.a
                                href={project.demoLink}
                                className="minecraft-button inline-flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink className="w-4 h-4" />
                                {t.demoLink}
                              </motion.a>
                              <motion.a
                                href={project.codeLink}
                                className="minecraft-button inline-flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Github className="w-4 h-4" />
                                {t.codeLink}
                              </motion.a>
                            </div>
                          </div>
                        </div>

                        <div className="minecraft-card p-6 relative overflow-hidden">
                          <ParticleSystem count={5} />
                          <h5 className="font-bold mb-4 minecraft-font flex items-center gap-2 relative z-10">
                            <BookOpen className="w-5 h-5 text-green-500" />
                            Description
                          </h5>
                          <p className="minecraft-text text-lg relative z-10">
                            {project.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="minecraft-card p-4 relative overflow-hidden">
                            <ParticleSystem count={3} />
                            <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                              <Code className="w-5 h-5 text-purple-500" />
                              Technologies
                            </h5>
                            <div className="flex flex-wrap gap-2 relative z-10">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="minecraft-badge">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="minecraft-card p-4 relative overflow-hidden">
                            <ParticleSystem count={3} />
                            <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                              <Star className="w-5 h-5 text-yellow-500" />
                              Key Features
                            </h5>
                            <div className="space-y-2 relative z-10">
                              {project.features.map((feature, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="minecraft-text flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {feature}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="minecraft-card p-4 relative overflow-hidden">
                          <ParticleSystem count={5} />
                          <h5 className="font-bold mb-3 minecraft-font flex items-center gap-2 relative z-10">
                            <MessageCircle className="w-5 h-5 text-blue-500" />
                            Project Stats
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 minecraft-font">
                                {project.views}
                              </div>
                              <p className="text-sm minecraft-text">{t.viewCount}</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600 minecraft-font">
                                {project.likes}
                              </div>
                              <p className="text-sm minecraft-text">Likes</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 minecraft-font">
                                {project.technologies.length}
                              </div>
                              <p className="text-sm minecraft-text">Technologies</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600 minecraft-font">
                                {project.features.length}
                              </div>
                              <p className="text-sm minecraft-text">Features</p>
                            </div>
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
