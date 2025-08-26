

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import cloudinary, { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const projectId = parseInt(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const projectId = parseInt(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const demoLink = formData.get("demoLink") as string | null;
    const sourceLinks = formData.get("sourceLinks") as string;
    const technologies = formData.get("technologies") as string;
    const duration = formData.get("duration") as string | null;
    const category = formData.get("category") as string | null;
    const memberCount = formData.get("memberCount") as string | null;
    const keyFeatures = formData.get("keyFeatures") as string;
    const isHidden = formData.get("isHidden") === "true";
    const images = formData.getAll("images") as File[];
    const removedImageUrls = formData.get("removedImageUrls") ? JSON.parse(formData.get("removedImageUrls") as string) : [];

    if (!title) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    // Parse input arrays
    const parsedSourceLinks = sourceLinks ? JSON.parse(sourceLinks) : existingProject.sourceLinks;
    const parsedTechnologies = technologies ? JSON.parse(technologies) : existingProject.technologies;
    const parsedKeyFeatures = keyFeatures ? JSON.parse(keyFeatures) : existingProject.keyFeatures;

    // Upload new images
    const newImageUrls: string[] = [];
    for (const image of images) {
      if (image && image.size > 0) {
        const url = await uploadToCloudinary(image);
        newImageUrls.push(url);
      }
    }

    const updatedImageUrls = [
      ...(existingProject.imageUrls || []).filter((url) => !removedImageUrls.includes(url)),
      ...newImageUrls,
    ];

    for (const url of removedImageUrls) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(`projects/${publicId}`);
          console.log(`Deleted image from Cloudinary: projects/${publicId}`);
        } catch (error) {
          console.error(`Failed to delete image from Cloudinary: ${url}`, error);
        }
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        imageUrls: updatedImageUrls,
        demoLink,
        sourceLinks: parsedSourceLinks,
        technologies: parsedTechnologies,
        duration: duration ? parseInt(duration) : existingProject.duration,
        category,
        memberCount: memberCount ? parseInt(memberCount) : existingProject.memberCount,
        keyFeatures: parsedKeyFeatures,
        isHidden,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
    request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      {
        status: 400,
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
  const { isHidden } = body;
  const projectId = parseInt(params.id);
  if (isNaN(projectId)) {
    return NextResponse.json(
      {
        status: 400,
        success: false,
        message: "Invalid project ID",
      },
      { status: 400 }
    );
  }
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        status: 401,
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!existingProject) {
    return NextResponse.json(
      {
        status: 404,
        success: false,
        message: "Project not found",
      },
      { status: 404 }
    );
  }

  const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        isHidden,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const projectId = parseInt(params.id);
    if (isNaN(projectId)) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 }
      );
    }

    // Fetch existing project
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    for (const url of existingProject.imageUrls || []) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(`projects/${publicId}`);
          console.log(`Deleted image from Cloudinary: projects/${publicId}`);
        } catch (error) {
          console.error(`Failed to delete image from Cloudinary: ${url}`, error);
        }
      }
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
