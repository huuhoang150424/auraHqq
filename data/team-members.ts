// data/team-members.ts
export interface TeamMember {
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

// danh sách gốc (chưa fetch từ GitHub)
const rawTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Tran Minh Quang', // sẽ được override từ GitHub
    role: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'mariadb', 'TypeScript'],
    avatar: '',
    github: 'https://github.com/tmquang0209',
    linkedin: '',
    bio: '',
    projects: ['E-Commerce Platform', 'Real-time Chat App', 'Task Management System'],
    experience: '5+ years',
    achievements: [
      '🏆 Best Developer 2023',
      '🚀 10+ Successful Projects',
      '👨‍🏫 Mentor of 15+ Developers',
    ],
  },
  {
    id: 2,
    name: 'Thanh Hoa',
    role: 'Mobile developer',
    skills: ['React', 'Fluter', 'java'],
    avatar: '',
    github: 'https://github.com/DrawTok',
    linkedin: '',
    bio: '',
    projects: ['Design System Library', 'Mobile Banking App', 'E-learning Platform'],
    experience: '4+ years',
    achievements: ['🎨 Design Award Winner', '📱 50+ UI/UX Projects', '🌟 User Experience Expert'],
  },
  {
    id: 3,
    name: 'Nguyen Huu Hoang',
    role: 'Backend Developer',
    skills: ['node.js', 'Python', 'java', 'mysql'],
    avatar: '',
    github: 'https://github.com/huuhoang150424',
    linkedin: 'https://www.linkedin.com/in/ho%C3%A0ng-nguyen-9692b3272/',
    bio: '',
    projects: ['API Gateway', 'Microservices Architecture', 'Cloud Migration'],
    experience: '0+ years',
    achievements: ['⚡ Performance Optimizer'],
  },
];

async function fetchGithubInfo(url: string) {
  const username = url.split('github.com/')[1];
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch GitHub for ${username}`);
  return res.json();
}

export async function teamMembersData(language: string): Promise<TeamMember[]> {
  const members = await Promise.all(
    rawTeamMembers.map(async (member) => {
      try {
        const gh = await fetchGithubInfo(member.github);
        return {
          ...member,
          name: gh.name || member.name,
          avatar: gh.avatar_url || member.avatar,
          role:
            language === 'en'
              ? member.role
              : member.role === 'Full-Stack Developer'
              ? 'Lập Trình Viên Full-Stack'
              : member.role === 'Mobile developer'
              ? 'Lập Trinh Viên Mobile'
              : 'Lập Trình Viên Backend',
          bio:
            language === 'en'
              ? 'Fetched from GitHub bio: ' + (gh.bio || member.bio)
              : 'Thông tin từ GitHub bio: ' + (gh.bio || member.bio),
        };
      } catch (err) {
        console.error(err);
        return member;
      }
    })
  );
  return members;
}
