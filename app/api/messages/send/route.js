import connectDB from "@/config/database";

export async function POST(req) {
  let db; // Declare db variable to ensure closure in 'finally' block

  try {
    db = await connectDB();

    // Parse the request JSON
    const body = await req.json();
    console.log("Received Data:", body); // Debugging log

    const { sender_id, recipient_id, property_id, name, email, phone, body: messageBody } = body;

    if (!sender_id || !recipient_id || !property_id || !name || !email || !messageBody) {
      console.error("Missing Fields:", { sender_id, recipient_id, property_id, name, email, messageBody });
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const [result] = await db.execute(
      `INSERT INTO messages (sender_id, recipient_id, property_id, name, email, phone, body, seen, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [sender_id, recipient_id, property_id, name, email, phone || null, messageBody, 0]
    );

    return new Response(JSON.stringify({ message: "Message sent successfully!", id: result.insertId }), { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });

  } finally {
    // Ensure the database connection is closed
    if (db) {
      await db.end(); // Properly close the database connection
    }
  }
}
