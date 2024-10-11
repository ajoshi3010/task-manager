
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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

  return new Response(JSON.stringify({ token }), { status: 200 });
}
