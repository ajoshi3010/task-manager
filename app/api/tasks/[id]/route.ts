
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// GET /api/tasks/:id (Fetch a task by ID)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) }
  });
  return NextResponse.json(task);
}

// PUT /api/tasks/:id (Update a task by ID)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, description, completed } = await request.json();
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, completed }
  });
  return NextResponse.json(task);
}

// DELETE /api/tasks/:id (Delete a task by ID)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.task.delete({
    where: { id: Number(id) }
  });
  return NextResponse.json({ message: 'Task deleted' });
}
