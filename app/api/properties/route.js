import connectDB from "@/config/database";

export async function GET() {
  try {
    const db = await connectDB();
    const [properties] = await db.execute("SELECT * FROM properties");
    db.end(); // Close the connection

    return Response.json(properties, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return Response.json({ error: "Database query failed" }, { status: 500 });
  }
}

// DELETE - Remove property by ID (Authenticated)
export async function DELETE(req, { params }) {
  const auth = await authenticate(req);
  if (auth.error)
    return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const db = await connectDB();
    const { id } = params;

    const [rows] = await connection.execute(
      "SELECT id FROM messages WHERE property_id = ?",
      [id]
    );
    if (rows.length > 0) {
      return Response.json(
        { error: "Cannot delete property with existing messages." },
        { status: 400 }
      );
    }
    const [payments] = await db.execute(
      "SELECT id FROM payments WHERE owner_id = (SELECT owner_id FROM properties WHERE id = ?)",
      [id]
    );
    
    if (payments.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete property with active payments linked to owner." },
        { status: 400 }
      );
    }

    await db.execute("DELETE FROM properties WHERE id = ?", [id]);

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
