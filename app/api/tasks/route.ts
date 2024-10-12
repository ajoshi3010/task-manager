import { NextResponse, NextRequest } from 'next/server'; // Import NextResponse and NextRequest
import { jwtVerify } from 'jose'; // Use jose for JWT verification
import prisma from '@/lib/prisma'; // Import the Prisma client

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string); // Encode the JWT secret

export async function GET(request: NextRequest) { // Use NextRequest here
  const cookie = request.cookies.get('token'); // Get the token from cookies
  if (!cookie || !cookie.value) { // Check if cookie exists and has a value
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Verify the token and get the payload
    const { payload } = await jwtVerify(cookie.value, JWT_SECRET); // Use cookie.value
    const { userId } = payload as { userId: number }; // Extract userId from payload

    // Fetch tasks specific to the user
    const tasks = await prisma.task.findMany({
      where: {
        userId, // Filter tasks by userId
      },
    });

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
}

export async function POST(request: NextRequest) { // Use NextRequest here
  const { title, description } = await request.json();
  const cookie = request.cookies.get('token'); // Get the token from cookies

  if (!cookie || !cookie.value) { // Check if cookie exists and has a value
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Verify the token and get the payload
    const { payload } = await jwtVerify(cookie.value, JWT_SECRET); // Use cookie.value
    const { userId } = payload as { userId: number }; // Extract userId from payload

    // Create a new task associated with the user
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId, // Associate the task with the user
      },
    });

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
