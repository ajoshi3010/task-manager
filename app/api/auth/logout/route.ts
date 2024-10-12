import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Create a response object to clear the cookie
  const response = NextResponse.json({ message: 'Logout successful' });

  // Clear the token cookie by setting it with an expiration date in the past
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    sameSite: 'strict', // Use lowercase "strict" for sameSite
    expires: new Date(0), // Set to a past date to delete the cookie
  });

  return response; // Return the response
}
