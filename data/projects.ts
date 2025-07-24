export const projectsData = (language: string) => [
  {
    id: 1,
    name: 'RenterHub',
    description:
      language === 'en'
        ? 'Comprehensive rental management platform for landlords and tenants. Features include room listing, booking system, payment tracking, and an admin dashboard. Built with modern full-stack technologies and mobile-friendly design.'
        : 'Nền tảng quản lý cho thuê nhà/phòng trọ toàn diện dành cho chủ nhà và người thuê. Bao gồm các tính năng như đăng tin phòng, đặt phòng, theo dõi thanh toán và bảng điều khiển quản trị. Được xây dựng bằng công nghệ hiện đại và thiết kế thân thiện với thiết bị di động.',
    image:
      'https://mona.solutions/wp-content/uploads/2020/03/app-phan-mem-quan-ly-nha-tro-1000x562.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Flutter'],
    demoLink: '',
    codeLink: '',
    category: 'Web Application',
    duration: '6 months',
    teamSize: '4 developers',
    features: [
      'Room Listings',
      'Booking System',
      'Payment Tracking',
      'Admin Dashboard',
      'Mobile Responsive',
    ],
    likes: 45,
    views: 1250,
  },
];
