'use client';

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
import Image from 'next/image';
import { Crown, Users, CheckCircle, Github, Linkedin } from 'lucide-react';

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

interface OptimizedTeamSectionProps {
  teamMembers: TeamMember[];
  translations: any;
}

export function OptimizedTeamSection({ teamMembers, translations }: OptimizedTeamSectionProps) {
  const t = translations;

  return (
    <section
      className="py-16 px-6 bg-white/50 dark:bg-gray-800/50 relative overflow-hidden"
      id="team"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white minecraft-font flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-yellow-500" />
          {t.teamTitle}
          <Crown className="w-8 h-8 text-yellow-500" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="minecraft-card hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 relative w-32 h-32">
                        <Image
                          src={member.avatar || '/placeholder.svg'}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover w-full h-full"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <CardTitle className="minecraft-font">{member.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 minecraft-text">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardContent>
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
                  <div className="p-6">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="minecraft-font text-3xl">{member.name}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <Image
                          src={member.avatar || '/placeholder.svg'}
                          alt={member.name}
                          width={192}
                          height={192}
                          className="rounded-full border-4 border-white dark:border-gray-800 object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold minecraft-font text-xl mb-2">{member.role}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 minecraft-text mb-4">
                            {member.experience}
                          </p>
                          <div className="flex gap-4">
                            <a
                              href={member.github}
                              className="minecraft-button inline-flex items-center gap-2"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </a>
                            <a
                              href={member.linkedin}
                              className="minecraft-button inline-flex items-center gap-2"
                            >
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="minecraft-card p-4">
                        <h5 className="font-bold mb-3 minecraft-font">Bio</h5>
                        <p className="minecraft-text">{member.bio}</p>
                      </div>

                      <div className="minecraft-card p-4">
                        <h5 className="font-bold mb-3 minecraft-font">Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="minecraft-badge">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
