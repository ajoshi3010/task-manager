import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string); // Encode the JWT secret

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('token'); // Get the token from cookies
  if (!cookie || !cookie.value) { // Check if cookie exists and has a value
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify the token and get the payload
    const { payload } = await jwtVerify(cookie.value, JWT_SECRET); // Use cookie.value
    const { email } = payload as { email: string }; // Extract email from payload

    // Return the user's email in the response
    return NextResponse.json({ email }, { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
