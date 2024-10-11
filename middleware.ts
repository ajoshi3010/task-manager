// middleware.ts
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string); // Encode the JWT secret

export async function middleware(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(authHeader); // Log the authorization header
  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token); // Log the extracted token

  try {
    // Verify the token using jose
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log("Token verified:", payload); // Log the decoded token payload
    return NextResponse.next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/tasks/:path*'], // Protect tasks API routes
};
