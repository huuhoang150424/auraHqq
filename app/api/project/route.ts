
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);


  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await prisma.project.count();

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Successfully',
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
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

export async function POST(request: NextRequest) {
  try {
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

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const demoLink = formData.get('demoLink') as string | null;
    const sourceLinks = formData.get('sourceLinks') as string;
    const technologies = formData.get('technologies') as string;
    const duration = formData.get('duration') as string | null;
    const category = formData.get('category') as string | null;
    const memberCount = formData.get('memberCount') as string | null;
    const keyFeatures = formData.get('keyFeatures') as string;
    const isHidden = formData.get('isHidden') === 'true';
    const images = formData.getAll('images') as File[];

    if (!title) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: 'Title is required',
        },
        { status: 400 }
      );
    }

    const parsedSourceLinks = sourceLinks ? JSON.parse(sourceLinks) : [];
    const parsedTechnologies = technologies ? JSON.parse(technologies) : [];
    const parsedKeyFeatures = keyFeatures ? JSON.parse(keyFeatures) : [];

    const imageUrls: string[] = [];
    for (const image of images) {
      if (image) {
        const url = await uploadToCloudinary(image);
        imageUrls.push(url);
      }
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrls,
        demoLink,
        sourceLinks: parsedSourceLinks,
        technologies: parsedTechnologies,
        duration: duration ? parseInt(duration) : null,
        category,
        memberCount: memberCount ? parseInt(memberCount) : null,
        keyFeatures: parsedKeyFeatures,
        isHidden,
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: 'Project created successfully',
      project: newProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
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
