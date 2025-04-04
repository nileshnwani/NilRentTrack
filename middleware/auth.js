
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export function verifyAuth(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return null;
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    // Handle verification error (e.g., token expired, invalid signature)
    console.error('Token verification failed:', err);
    return;
  }
  // Proceed with the decoded payload
  console.log('Decoded payload:', decoded);
});
