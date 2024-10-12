// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string); // Encode the JWT secret

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('token'); // Get the token from cookies
  if (!cookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = cookie.value; // Use the cookie value directly

  try {
    // Verify the token using jose
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Optional: Attach user information to request
    (req as any).user = payload; 

    return NextResponse.next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/tasks/:path*'], // Protect tasks API routes
};
