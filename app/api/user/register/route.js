export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  let connection; 

  try {
    const { email, username, password, image } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    connection = await connectDB();

    // Check if user already exists
    const [existingUser] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into MySQL
    await connection.execute(
      `INSERT INTO users (email, username, image, password, is_admin) VALUES (?, ?, ?, ?, ?)`,
      [email, username, image || '', hashedPassword, false] // Default is_admin = false
    );

    // Get the newly created user ID
    const [newUser] = await connection.execute(
      `SELECT id, email, username, is_admin FROM users WHERE email = ?`,
      [email]
    );

    if (newUser.length === 0) {
      return NextResponse.json({ error: 'User registration failed' }, { status: 500 });
    }

    const user = newUser[0];

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.is_admin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.is_admin,
      },
    });

    // Set JWT token in HTTP-only cookie
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });

    return response;
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
  finally {
    if (connection) await connection.end(); // Ensure connection is closed
  }
}
