import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@gmail.com' }
    });

    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        name: 'Admin',
        socialLinks: [],
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
        bio: 'System Administrator',
        position: 'Full Stack Developer',
        experienceYears: 5,
      },
    });
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
