import connectDB from "@/config/database";

export async function GET(req) {
  let connection;

  try {
    const userId = req.headers.get("user-id");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    connection = await connectDB();
    if (!connection) {
      return new Response(JSON.stringify({ error: "Database connection failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const currentDate = new Date();
    const next7DaysDate = new Date();
    next7DaysDate.setDate(currentDate.getDate() + 7);

    const todayDateString = currentDate.toISOString().split("T")[0];
    const next7DaysDateString = next7DaysDate.toISOString().split("T")[0];

    const query = `
      SELECT id, name, street, city, state, zipcode, due_date, owner_id, renter_id
      FROM properties
      WHERE due_date BETWEEN ? AND ?
      AND (owner_id = ? OR renter_id = ?)
    `;

    const [rows] = await connection.execute(query, [
      todayDateString, next7DaysDateString,
      userId, userId,
    ]);

    if (rows.length > 0) {
      await sendRentDueMessages(rows, userId, connection);
    }

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    if (connection) await connection.end();
  }
}

// ✅ Wrap async logic inside a function
async function sendRentDueMessages(properties, userId, connection) {
  for (const property of properties) {
    const checkMessageQuery = `
      SELECT id FROM messages 
      WHERE recipient_id = ? AND property_id = ? AND name = 'Rent Due Reminder' AND sent = 1
    `;

    const [messageRows] = await connection.execute(checkMessageQuery, [
      userId,
      property.id,
    ]);

    if (messageRows.length === 0) { 
      const messageQuery = `
        INSERT INTO messages (sender_id, recipient_id, property_id, name, email, phone, body, seen, sent, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      await connection.execute(messageQuery, [
        1, // sender_id (Admin)
        userId,
        property.id,
        "Rent Due Reminder",
        "admin@gmail.com",
        "0000000000",
        `Reminder: Your rent for property "${property.name}" is due on ${property.due_date}.`,
        0,
        1, // Mark as sent
      ]);

      // Call message read API
      try {
        const response = await fetch(`/api/messages/read?userId=${encodeURIComponent(userId)}`);
        const data = await response.json();
        console.log(`Message read API Response for property ${property.id}:`, data);
      } catch (error) {
        console.error(`Error calling message read API for property ${property.id}:`, error);
      }
    }
  }
}
