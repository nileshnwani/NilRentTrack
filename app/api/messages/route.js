import connectDB from "@/config/database";

export async function DELETE(req) {
  let db; // Declare the connection variable to ensure proper closure

  try {
    const url = new URL(req.url);
    const messageId = url.searchParams.get("id");

    if (!messageId) {
      return new Response(JSON.stringify({ error: "Missing message ID" }), { status: 400 });
    }

    db = await connectDB();

    // Delete the message from MySQL
    const [result] = await db.execute("DELETE FROM messages WHERE id = ?", [messageId]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Message not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: "Message deleted" }), { status: 200 });

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });

  } finally {
    // Ensure the database connection is closed
    if (db) {
      await db.end();
    }
  }
}

export async function PATCH(req) {
  let db; // Declare the connection variable for proper closure

  try {
    const { id, seen } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing message ID" }), { status: 400 });
    }

    db = await connectDB();

    // Update the seen status in MySQL
    const [result] = await db.execute("UPDATE messages SET seen = ? WHERE id = ?", [seen, id]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Message not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: "Message updated" }), { status: 200 });

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });

  } finally {
    // Ensure the database connection is closed
    if (db) {
      await db.end();
    }
  }
}
