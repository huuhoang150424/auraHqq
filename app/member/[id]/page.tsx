'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Calendar,
  Code,
  BookOpen,
  Zap,
  Target,
  Crown,
  Sparkles,
  Rocket,
  Gem,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ParticleSystem } from '@/components/shared/particle-system'; // Import from shared

// Starry background component (same as main page)
const StarryBackground = () => {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number }>
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        // Giảm từ 100 xuống 50
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // Giảm size
          opacity: Math.random() * 0.6 + 0.2, // Giảm opacity
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            backgroundColor: '#fbbf24',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};

export default function MemberProfile() {
  const params = useParams();
  const memberId = params.id as string;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  // Mock data - in real app, this would come from API/database
  const memberData = {
    1: {
      name: 'Alex Nguyen',
      role: 'Full-Stack Developer',
      avatar: '/placeholder.svg?height=200&width=200',
      banner: '/placeholder.svg?height=300&width=800',
      bio: "Passionate full-stack developer with 5+ years of experience in modern web technologies. I love creating scalable applications and mentoring junior developers. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.",
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js', 'GraphQL', 'Docker', 'AWS'],
      experience: '5+ years',
      location: 'Ho Chi Minh City, Vietnam',
      email: 'alex@codecraft.dev',
      github: 'https://github.com/alexnguyen',
      linkedin: 'https://linkedin.com/in/alexnguyen',
      projects: [
        {
          name: 'E-Commerce Platform',
          description:
            'Led the development of a full-featured online shopping platform with microservices architecture.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
          role: 'Lead Developer',
          duration: '6 months',
        },
        {
          name: 'Real-time Chat App',
          description:
            'Built a scalable real-time messaging application with WebSocket integration.',
          technologies: ['Next.js', 'Socket.io', 'Redis', 'PostgreSQL'],
          role: 'Full-Stack Developer',
          duration: '3 months',
        },
      ],
      blogPosts: [
        {
          title: 'Building Scalable React Applications',
          date: '2024-01-15',
          excerpt:
            'Best practices for structuring large React applications with proper state management and component architecture.',
          readTime: '8 min read',
        },
        {
          title: 'Microservices with Node.js',
          date: '2024-01-08',
          excerpt:
            'A comprehensive guide to building and deploying microservices using Node.js and Docker.',
          readTime: '12 min read',
        },
      ],
    },
    2: {
      name: 'Sarah Kim',
      role: 'UI/UX Designer',
      avatar: '/placeholder.svg?height=200&width=200',
      banner: '/placeholder.svg?height=300&width=800',
      bio: 'Creative designer who bridges the gap between design and development. I specialize in creating intuitive user experiences and beautiful interfaces. My passion lies in understanding user needs and translating them into elegant design solutions.',
      skills: [
        'Figma',
        'Adobe Creative Suite',
        'React',
        'TypeScript',
        'User Research',
        'Prototyping',
        'Design Systems',
      ],
      experience: '4+ years',
      location: 'Seoul, South Korea',
      email: 'sarah@codecraft.dev',
      github: 'https://github.com/sarahkim',
      linkedin: 'https://linkedin.com/in/sarahkim',
      projects: [
        {
          name: 'Design System Library',
          description:
            'Created a comprehensive design system used across multiple products, improving consistency and development speed.',
          technologies: ['Figma', 'React', 'Storybook'],
          role: 'Lead Designer',
          duration: '4 months',
        },
        {
          name: 'Mobile Banking App',
          description:
            'Designed user-friendly mobile banking interface with focus on accessibility and security.',
          technologies: ['Figma', 'React Native', 'User Testing'],
          role: 'UX Designer',
          duration: '5 months',
        },
      ],
      blogPosts: [
        {
          title: 'Design Systems That Scale',
          date: '2024-01-20',
          excerpt: 'How to build and maintain design systems that grow with your product and team.',
          readTime: '10 min read',
        },
      ],
    },
  };

  const member = memberData[memberId as unknown as keyof typeof memberData];

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Member not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} minecraft-background-pattern`}
    >
      <StarryBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="minecraft-button bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white minecraft-font">
            {member.name}'s Profile
          </h1>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-64 overflow-hidden">
            <Image
              src={member.banner || '/placeholder.svg'}
              alt="Profile Banner"
              width={800}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            {/* Replaced MinecraftCube with a simple Image for profile page */}
            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
              <Image
                src={member.avatar || '/placeholder.svg'}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Profile Info */}
        <section className="pt-20 pb-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white minecraft-font">
              {member.name}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 minecraft-text">
              {member.role}
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <a
                href={member.github}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={member.linkedin}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto minecraft-text">
              {member.bio}
            </p>
          </div>
        </section>

        {/* Skills & Info */}
        <section className="py-8 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden">
          <ParticleSystem count={10} />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Skills */}
              <Card className="minecraft-card">
                <CardHeader>
                  <CardTitle className="minecraft-font flex items-center gap-2">
                    <Code className="w-6 h-6" />
                    🛠️ Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="minecraft-badge">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="minecraft-card">
                <CardHeader>
                  <CardTitle className="minecraft-font flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    💼 Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 minecraft-text">
                    {member.experience}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 minecraft-text">
                    Professional Experience
                  </p>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="minecraft-card">
                <CardHeader>
                  <CardTitle className="minecraft-font flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    📍 Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 minecraft-text">
                    {member.location}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 px-6 relative overflow-hidden">
          <ParticleSystem count={15} />
          <div className="max-w-6xl mx-auto relative z-10">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white minecraft-font flex items-center gap-2">
              <Rocket className="w-6 h-6" />
              🎯 Projects I've Worked On
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {member.projects.map((project, index) => (
                <Card
                  key={index}
                  className="minecraft-card hover:scale-105 transition-transform duration-300"
                >
                  <CardHeader>
                    <CardTitle className="minecraft-font flex items-center gap-2">
                      <Gem className="w-5 h-5 text-cyan-500" />
                      {project.name}
                    </CardTitle>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="minecraft-text flex items-center gap-1">
                        <Crown className="w-4 h-4" />
                        Role: {project.role}
                      </span>
                      <span className="minecraft-text flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Duration: {project.duration}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 minecraft-text">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="minecraft-badge">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden">
          <ParticleSystem count={10} />
          <div className="max-w-6xl mx-auto relative z-10">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white minecraft-font flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              📝 Latest Blog Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {member.blogPosts.map((post, index) => (
                <Card
                  key={index}
                  className="minecraft-card hover:scale-105 transition-transform duration-300"
                >
                  <CardHeader>
                    <CardTitle className="minecraft-font flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="minecraft-text">{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 minecraft-text">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 minecraft-text">
            Want to collaborate?{' '}
            <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
              Get in touch!
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
