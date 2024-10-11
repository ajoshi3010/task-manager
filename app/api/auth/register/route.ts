// import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }
}
