import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure you have this in your .env.local file

// Helper function to verify JWT
function verifyJWT(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // You can return user details from decoded token
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// GET /api/tasks/:id (Fetch a task by ID)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    verifyJWT(request); // Verifying the token
    const { id } = params;
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    // Handle the 'unknown' type by asserting it is an instance of 'Error'
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// PUT /api/tasks/:id (Update a task by ID)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    verifyJWT(request); // Verifying the token
    const { id } = params;
    const { title, description, completed } = await request.json();
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed },
    });
    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// DELETE /api/tasks/:id (Delete a task by ID)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    verifyJWT(request); // Verifying the token
    const { id } = params;
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
