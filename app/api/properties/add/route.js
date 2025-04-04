import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import fs from 'fs';
import path from 'path';

// Handle POST request to add a new property
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const name = formData.get('name');
    const type = formData.get('type');
    const description = formData.get('description');
    const street = formData.get('street');
    const city = formData.get('city');
    const state = formData.get('state');
    const zipcode = formData.get('zipcode');
    const country = formData.get('country');
    const numberOfUnits = formData.get('number_of_units');
    const rates = formData.get('rates');
    const sellerName = formData.get('seller_name');
    const sellerEmail = formData.get('seller_email');
    const sellerPhone = formData.get('seller_phone');
    const ownerId = formData.get('owner_id');
    const renterId = formData.get('renter_id');
    const dueDate = formData.get('due_date'); // New field

    // Ensure the 'public/uploads/' directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Handle image upload
    const imageFile = formData.get('images'); // Single image
    let imagePath = '';

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`; // Sanitize filename
      imagePath = `/uploads/${fileName}`; // Store relative path
      const filePath = path.join(uploadDir, fileName);

      // Save file to disk
      fs.writeFileSync(filePath, buffer);
    }

    // Database connection
    const connection = await connectDB();

    const query = `
      INSERT INTO properties 
      (owner_id, renter_id, name, type, description, street, city, state, zipcode, country, number_of_units, rates, seller_name, seller_email, seller_phone, images, due_date) 
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ownerId, , name, type, description, street, city, state, zipcode, country, numberOfUnits, rates,
      sellerName, sellerEmail, sellerPhone, imagePath, dueDate
    ];

    const [result] = await connection.execute(query, values);
    await connection.end();

    return new Response(
      JSON.stringify({ message: 'Property added successfully', propertyId: result.insertId }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding property:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}
