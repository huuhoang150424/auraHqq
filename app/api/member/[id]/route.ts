
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberId = parseInt(params.id);
    const member = await prisma.user.findUnique({  where: { id: memberId }});
    if (!member) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: 'Member not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Member fetched successfully',
      member,
    });
  } catch (error) {
    console.error('Error fetching member:', error);
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
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const memberId = parseInt(params.id);
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

    const existingMember = await prisma.user.findUnique({
      where: { id: memberId },
    });
    if (!existingMember) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: 'Member not found',
        },
        { status: 404 }
      );
    }

    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        id: { not: memberId },
      },
    });
    if (emailExists) {
      return NextResponse.json(
        {
          status: 409,
          success: false,
          message: 'Email already exists',
        },
        { status: 409 }
      );
    }

    // Parse JSON strings
    const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : existingMember.socialLinks;
    const parsedSkills = skills ? JSON.parse(skills) : existingMember.skills;

    // Upload avatar mới nếu có
    let avatarUrl: string | null = existingMember.avatarUrl;
    if (avatar) {
      avatarUrl = await uploadToCloudinary(avatar);
    }

    // Cập nhật member
    const updatedMember = await prisma.user.update({
      where: { id: memberId },
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
      status: 200,
      success: true,
      message: 'Member updated successfully',
      member: updatedMember,
    });
  } catch (error) {
    console.error('Error updating member:', error);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  // Kiểm tra session
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
    const memberId = parseInt(params.id);
    const existingMember = await prisma.user.findUnique({
      where: { id: memberId },
    });

    if (!existingMember) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: 'Member not found',
        },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id: memberId },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting member:', error);
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
