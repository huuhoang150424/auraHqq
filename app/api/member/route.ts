import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const members = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

const total = await prisma.user.count();

    return NextResponse.json({
      status: 200,
      success: true,
      message: ' successfully',
      members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        status: 401,
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const socialLinks = formData.get('socialLinks') as string;
    const skills = formData.get('skills') as string;
    const bio = formData.get('bio') as string | null;
    const experienceYears = formData.get('experienceYears') as string | null;
    const position = formData.get('position') as string | null;
    const avatar = formData.get('avatar') as File | null;

    if (!email || !name) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: 'Email and name are required',
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          status: 409,
          success: false,
          message: 'Email already exists',
        },
        { status: 409 }
      );
    }

    const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : [];
    const parsedSkills = skills ? JSON.parse(skills) : [];

    let avatarUrl: string | null = null;
    if (avatar) {
      avatarUrl = await uploadToCloudinary(avatar);
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        socialLinks: parsedSocialLinks,
        skills: parsedSkills,
        avatarUrl,
        bio,
        experienceYears: experienceYears ? parseInt(experienceYears) : null,
        position,
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
