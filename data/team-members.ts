// data/team-members.ts
export const teamMembersData = (language: string) => [
  {
    id: 1,
    name: 'Tran Minh Quang',
    role: language === 'en' ? 'Full-Stack Developer' : 'Lập Trình Viên Full-Stack',
    skills: ['React', 'Node.js', 'mariadb', 'TypeScript'],
    avatar:
      'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/473617857_1148551596894386_4550575089446314104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=dNwj9lXqN3cQ7kNvwHx2HuW&_nc_oc=AdncRH1TXQYJI7-s9tmUXa3c2fDvJrtN0rAlR1YC6KouGfBpXRtblvBIGuYyKhHJjd4&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=-C3EfLspkJuDiNhmGtdMVw&oh=00_AfSYT44Vr-ITusSfEbHxLc_Y0Ygq4dD6uZjE2nrMj512YA&oe=687E4CA4',
    github: 'https://github.com/tmquang0209',
    linkedin: '',
    bio:
      language === 'en'
        ? 'Passionate full-stack developer with 5+ years of experience in modern web technologies. Specialized in React ecosystem and Node.js backend development. Love creating scalable applications and mentoring junior developers.'
        : 'Lập trình viên full-stack đam mê với hơn 5 năm kinh nghiệm trong các công nghệ web hiện đại. Chuyên về hệ sinh thái React và phát triển backend Node.js. Yêu thích tạo ra các ứng dụng có thể mở rộng và hướng dẫn các lập trình viên junior.',
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
    role: language === 'en' ? 'Mobile developer' : 'Lập trinh viên Mobile',
    skills: ['React', 'Fluter', 'java'],
    avatar:
      'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/481251418_1175026190913593_6065547444278603320_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=VzkzVEDIqC4Q7kNvwGA0CZ3&_nc_oc=AdlTaXEF3a83SI9T4kmamai8wwjwD_C_i808qtgoP01OlO1FP1LjRAe4klbi9TACwZ4&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=soEwHlsL5MoUyjRIf9Uxkg&oh=00_AfQM_oIh2IgeMmouX8hN0k4IWGPPWpSl0WzbI72l6Nsnbw&oe=687E77AC',
    github: 'https://github.com/DrawTok',
    linkedin: '',
    bio:
      language === 'en'
        ? 'Creative designer who bridges the gap between design and development. Expert in creating intuitive user experiences and scalable design systems. Passionate about accessibility and inclusive design.'
        : 'Nhà thiết kế sáng tạo kết nối khoảng cách giữa thiết kế và phát triển. Chuyên gia tạo ra trải nghiệm người dùng trực quan và hệ thống thiết kế có thể mở rộng. Đam mê về khả năng tiếp cận và thiết kế bao trùm.',
    projects: ['Design System Library', 'Mobile Banking App', 'E-learning Platform'],
    experience: '4+ years',
    achievements: ['🎨 Design Award Winner', '📱 50+ UI/UX Projects', '🌟 User Experience Expert'],
  },
  {
    id: 3,
    name: 'Nguyen Huu Hoang',
    role: language === 'en' ? 'Backend Developer' : 'Lập Trình Viên Backend',
    skills: ['Laravel', 'Python', 'PostgreSQL', 'AWS'],
    avatar:
      'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/485683367_1196462345436644_5088059969184010654_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=4PA_YCKQgooQ7kNvwGGJhon&_nc_oc=AdkD7fdtgtTqu4tZv9lgbqWy42PMy-Bo4O-HLHuwPDSoJH1lpmFNjJbTmPJIf_OZl-I&_nc_zt=23&_nc_ht=scontent.fhan5-11.fna&_nc_gid=AOT8VwOI3BKo89OgROsebQ&oh=00_AfSfPKF7V8eDr76VDYnOCeHdWTKWhBO4qFje1BkL7As76Q&oe=687E702C',
    github: 'https://github.com/huuhoang150424',
    linkedin: 'https://www.linkedin.com/in/ho%C3%A0ng-nguyen-9692b3272/',
    bio:
      language === 'en'
        ? 'Backend specialist focused on scalable architecture and clean code. Expert in microservices and cloud infrastructure. Passionate about performance optimization and security best practices.'
        : 'Chuyên gia backend tập trung vào kiến trúc có thể mở rộng và code sạch. Chuyên gia về microservices và hạ tầng đám mây. Đam mê về tối ưu hóa hiệu suất và các thực hành bảo mật tốt nhất.',
    projects: ['API Gateway', 'Microservices Architecture', 'Cloud Migration'],
    experience: '0+ years',
    achievements: [
      '☁️ Cloud Architecture Expert',
      '🔒 Security Specialist',
      '⚡ Performance Optimizer',
    ],
  },
];
