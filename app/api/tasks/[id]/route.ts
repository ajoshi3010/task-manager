import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

async function verifyJWTFromCookies(req: NextRequest) { // Change to NextRequest
  const cookie = req.cookies.get('token');
  if (!cookie) {
    throw new Error('Unauthorized');
  }

  const token = cookie.value; // Get the token from cookies
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload; // Return decoded payload
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await verifyJWTFromCookies(request); // Verify token from cookies
    const { id } = params;
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await verifyJWTFromCookies(request); // Verify token from cookies
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await verifyJWTFromCookies(request); // Verify token from cookies
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
