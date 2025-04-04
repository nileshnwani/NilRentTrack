import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
export const dynamic = 'force-dynamic';


export async function PUT(req) {
  let db;
  try {
    const { email, username, image } = await req.json();

    if (!email || !username) {
      return NextResponse.json({ error: 'Email and Username are required' }, { status: 400 });
    }

     db = await connectDB();

    // Update user details in MySQL
    const [result] = await db.execute(
      `UPDATE users SET username = ?, image = ? WHERE email = ?`,
      [username, image, email]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'User not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  finally {
    if (db) await db.end(); // Ensure connection is closed
  }
}
