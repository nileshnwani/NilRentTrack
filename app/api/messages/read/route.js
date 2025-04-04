export const dynamic = 'force-dynamic'

import connectDB from "@/config/database";

export async function GET(req) {
  let db; // Declare db outside try block for proper closure

  try {
    const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    db = await connectDB();

    // Fetch messages for the specific user
    const [rows] = await db.execute(
      "SELECT id, sender_id, property_id, name AS propertyName, email, phone, body, created_at AS createdAt, seen FROM messages WHERE recipient_id = ? ORDER BY created_at DESC",
      [userId]
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error", details: error.message }), {
      status: 500,
    });
  } finally {
    // Ensure the database connection is closed
    if (db) {
      await db.end(); // Close the connection properly
    }
  }
}
