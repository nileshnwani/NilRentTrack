import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  let connection; 

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    connection = await connectDB();
    const [rows] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [email]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin,
      // Add any other relevant user information here
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({
      message: 'Login successful',
      user: payload,
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  finally {
    if (connection) await connection.end(); // Ensure connection is closed
  }
}
