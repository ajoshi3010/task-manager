import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  // Set the token as a cookie
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Set cookie options as needed

  return response;
}
