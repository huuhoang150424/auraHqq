// data/blog-posts.ts
export const blogPostsData = (language: string) => [
  {
    title:
      language === 'en'
        ? 'Building Scalable React Applications'
        : 'Xây Dựng Ứng Dụng React Có Thể Mở Rộng',
    excerpt:
      language === 'en'
        ? 'Best practices for structuring large React applications with proper state management and component architecture.'
        : 'Các thực hành tốt nhất để cấu trúc ứng dụng React lớn với quản lý state và kiến trúc component phù hợp.',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Frontend',
  },
  {
    title: language === 'en' ? 'Microservices with Node.js' : 'Microservices với Node.js',
    excerpt:
      language === 'en'
        ? 'A comprehensive guide to building and deploying microservices using Node.js and Docker.'
        : 'Hướng dẫn toàn diện về xây dựng và triển khai microservices sử dụng Node.js và Docker.',
    date: '2024-01-08',
    readTime: '12 min',
    category: 'Backend',
  },
  {
    title: language === 'en' ? 'Design Systems That Scale' : 'Hệ Thống Thiết Kế Có Thể Mở Rộng',
    excerpt:
      language === 'en'
        ? 'How to build and maintain design systems that grow with your product and team.'
        : 'Cách xây dựng và duy trì hệ thống thiết kế phát triển cùng với sản phẩm và đội ngũ của bạn.',
    date: '2024-01-01',
    readTime: '10 min',
    category: 'Design',
  },
];
