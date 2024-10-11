import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// GET /api/tasks (Fetch all tasks)
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// POST /api/tasks (Add a new task)
export async function POST(request: Request) {
  const { title, description } = await request.json();
  const task = await prisma.task.create({
    data: { title, description }
  });
  return NextResponse.json(task);
}
