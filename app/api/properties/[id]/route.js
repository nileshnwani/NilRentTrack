// app/api/properties/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  const { id } = params;
  let connection; // Declare connection outside try block

  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM properties WHERE id = ?', [id]);
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  finally {
    if (connection) await connection.end();
  }

 
}


export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Property ID is required' }), {
      status: 400,
    });
  }

  try {
    const db = await connectDB();
    
    // Check if property exists before deleting
    const [rows] = await db.execute('SELECT * FROM properties WHERE id = ?', [id]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Property not found' }), {
        status: 404,
      });
    }

    // Delete the property
    await db.execute('DELETE FROM properties WHERE id = ?', [id]);

    return new Response(null, { status: 204 }); // 204 No Content (Success)
  } catch (error) {
    console.error('Delete Error:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
    });
  }
  finally {
    if (db) await db.end();
  }

}

