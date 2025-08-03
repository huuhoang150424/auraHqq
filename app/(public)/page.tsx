'use client';

import { useState, useEffect, useMemo } from 'react';

// Data Imports
import { teamMembersData } from '@/data/team-members';
import { projectsData } from '@/data/projects';
import { blogPostsData } from '@/data/blog-posts';
import { servicePackagesData } from '@/data/service-packages';
import { techIconsData } from '@/data/tech-icons';
import { translations } from '@/lib/i18n';

// Layout Components
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// UI Components
import { MinecraftAIChat } from '@/components/ui/minecraft-ai-chat';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { ThemeCustomizer } from '@/components/ui/theme-customizer';

// Section Components
import { HeroSection } from '@/components/sections/hero-section';
import { IntroductionSection } from '@/components/sections/introduction-section';
import { KpiSection } from '@/components/sections/kpi-section';
import { OptimizedTeamSection } from '@/components/sections/optimized-team-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ServicePackagesSection } from '@/components/sections/service-packages-section';
import { TechStackSection } from '@/components/sections/tech-stack-section';
import { PlaygroundSection } from '@/components/sections/playground-section';
import { BlogSection } from '@/components/sections/blog-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';

// Shared Components
import { MinecraftBackground } from '@/components/shared/minecraft-background';

export default function AdvancedTeamPortfolio() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [themeStyle, setThemeStyle] = useState('tech');

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('casual', themeStyle === 'casual');
  }, [theme, themeStyle]);

  const teamMembers = useMemo(() => teamMembersData(language), [language]);
  const projects = useMemo(() => projectsData(language), [language]);
  const blogPosts = useMemo(() => blogPostsData(language), [language]);
  const servicePackages = useMemo(() => servicePackagesData(t), [t]);
  const techIcons = useMemo(() => techIconsData, []);

  const downloadPDF = () => {
    alert(t.downloadPortfolio);
  };

  const handleThemeCustomizerChange = (newThemeSettings: any) => {};

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'dark minecraft-world-dark' : 'minecraft-world-light'
      }`}
    >
      <MinecraftBackground />
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 z-50 scroll-indicator" />
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        themeStyle={themeStyle}
        setThemeStyle={setThemeStyle}
        translations={t}
        downloadPDF={downloadPDF}
      />
      <MinecraftAIChat language={language} theme={theme} translations={t} />
      <BackToTopButton language={language} translations={t} />
      <ThemeCustomizer onThemeChange={handleThemeCustomizerChange} />
      <main className="relative z-10 pt-20">
        <HeroSection translations={t} />
        <IntroductionSection translations={t} />
        <KpiSection translations={t} />
        <OptimizedTeamSection teamMembers={teamMembers} translations={t} />
        <ProjectsSection projects={projects} translations={t} language={language} />
        <ServicePackagesSection
          servicePackages={servicePackages}
          translations={t}
          language={language}
        />
        <TechStackSection techIcons={techIcons} translations={t} />
        <BlogSection blogPosts={blogPosts} translations={t} />
        <TestimonialsSection translations={t} />
        <ContactSection translations={t} />
      </main>
      <Footer translations={t} />
    </div>
  );
}
