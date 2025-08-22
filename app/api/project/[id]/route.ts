

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

}
