import { NextResponse } from 'next/server';
import connectDB from '@/config/database';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const owner_id = url.searchParams.get('owner_id');

    if (!owner_id) {
      return NextResponse.json({ error: 'Missing owner_id' }, { status: 400 });
    }

    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM properties WHERE owner_id = ?', [owner_id]);
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No properties found', owner_id }, { status: 404 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
