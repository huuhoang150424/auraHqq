// data/team-members.ts
export const teamMembersData = (language: string) => [
  {
    id: 1,
    name: 'Tran Minh Quang',
    role: language === 'en' ? 'Full-Stack Developer' : 'Lập Trình Viên Full-Stack',
    skills: ['React', 'Node.js', 'mariadb', 'TypeScript'],
    avatar:
      'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/501784216_2791970817679515_5422156454168742973_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ky64s-dMBzkQ7kNvwFwfb_v&_nc_oc=AdmpekQ3Av8XiTX-f2Ndfc3endiEhPDShg2-KWxFv87PFuj8EFi7YGp5aNZte4jbPJs&_nc_zt=23&_nc_ht=scontent.fhan5-11.fna&_nc_gid=85DV4WkcmDyIZDupeBZufw&oh=00_AfQHccP1WLNDlCue950KU1vxHEvT_Eai010xSaSCFR5rHA&oe=6888B9C7',
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
      'https://avatars.githubusercontent.com/u/111066440?v=4',
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
    skills: ['node.js', 'Python', 'java', 'mysql'],
    avatar:
      'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/484813610_1194945058921706_5113727452917262401_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=t5BYpAe_xCwQ7kNvwHVZP7R&_nc_oc=AdnQ12WuEG07g8IsRsgETxLMC0SCLwNK72OD2Yq-ZNKVH0HWH8oEzt00s50AwBCEIsk&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=kH-uYgA7qWYqrzXd7t5Htw&oh=00_AfSse84un92NzEZJT4WQl3ibmnijFx4ZawladbZ2j9wtsQ&oe=6888B36E',
    github: 'https://github.com/huuhoang150424',
    linkedin: 'https://www.linkedin.com/in/ho%C3%A0ng-nguyen-9692b3272/',
    bio:
      language === 'en'
        ? 'Backend specialist focused on scalable architecture and clean code. Expert in microservices and cloud infrastructure. Passionate about performance optimization and security best practices.'
        : 'Chuyên gia backend tập trung vào kiến trúc có thể mở rộng và code sạch. Chuyên gia về microservices và hạ tầng đám mây. Đam mê về tối ưu hóa hiệu suất và các thực hành bảo mật tốt nhất.',
    projects: ['API Gateway', 'Microservices Architecture', 'Cloud Migration'],
    experience: '0+ years',
    achievements: [
      '⚡ Performance Optimizer',
    ],
  },
];
