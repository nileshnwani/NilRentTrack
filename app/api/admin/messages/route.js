import connectDB from '@/config/database';  // Replace with your database connection
import { NextResponse } from 'next/server';

export async function GET() {
  let connection;
  try {
    connection = await connectDB();  // Open connection

    // Fetch messages, properties, and bookmarks
    const [messages] = await connection.execute(`
      SELECT messages.id, messages.body, messages.read, messages.created_at, 
             u1.username AS sender, u2.username AS recipient, p.name AS property_name
      FROM messages 
      JOIN users u1 ON messages.sender_id = u1.id
      JOIN users u2 ON messages.recipient_id = u2.id
      JOIN properties p ON messages.property_id = p.id
    `);

    const [properties] = await connection.execute('SELECT * FROM properties');
    const [bookmarks] = await connection.execute('SELECT * FROM user_bookmarks');

    return NextResponse.json({ messages, properties, bookmarks });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });

  } finally {
    if (connection) await connection.end();  // Close the connection
  }
}
