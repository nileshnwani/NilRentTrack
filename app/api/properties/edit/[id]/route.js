export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import fs from "fs";
import path from "path";

// Handle GET request to fetch a single property
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM properties WHERE id = ?",
      [id]
    );
    await connection.end();
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle PUT request to update an existing property
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    
    const formData = await req.formData();

    const name = formData.get("name");
    const type = formData.get("type");
    const description = formData.get("description");
    const street = formData.get("street");
    const city = formData.get("city");
    const state = formData.get("state");
    const zipcode = formData.get("zipcode");
    const country = formData.get("country");
    const numberOfUnits = formData.get("number_of_units");
    const rates = formData.get("rates");
    const sellerName = formData.get("seller_name");
    const sellerEmail = formData.get("seller_email");
    const sellerPhone = formData.get("seller_phone");
    const dueDate = formData.get("due_date");
   // Ensure the 'public/uploads/' directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

 // Handle image upload
 const imageFile = formData.get('images'); // Single image
 let imagePath = '';
 

    // Handle file upload only if a new file is uploaded
    if (
      imageFile &&
      typeof imageFile.name === 'string' &&
      imageFile.size > 0
    ) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      imagePath = `/uploads/${fileName}`;
      const filePath = path.join(uploadDir, fileName);
    
      fs.writeFileSync(filePath, buffer);
    }
    

    const connection = await connectDB();
// Before forming your UPDATE query
if (!imagePath) {
  // Fetch the current image path from DB to keep it intact
  const connection = await connectDB();
  const [rows] = await connection.execute("SELECT images FROM properties WHERE id = ?", [id]);
  imagePath = rows[0]?.images || '';
  await connection.end();
}

    const query = `
      UPDATE properties SET 
        name = ?, 
        type = ?, 
        description = ?, 
        street = ?, 
        city = ?, 
        state = ?, 
        zipcode = ?, 
        country = ?,
        number_of_units = ?,
        rates = ?,
        seller_name = ?, 
        seller_email = ?, 
        seller_phone = ?, 
        images = ?,
        due_date = ?,
        updated_at = NOW()
      WHERE id = ?
    `;

    const values = [
      name,
      type,
      description,
      street,
      city,
      state,
      zipcode,
      country,
      numberOfUnits,
      rates,
      sellerName,
      sellerEmail,
      sellerPhone,
      imagePath,
      dueDate,
      id,
    ];

    const [result] = await connection.execute(query, values);
    await connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Property not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
