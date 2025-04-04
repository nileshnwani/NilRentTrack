import connectDB from "@/config/database";

export async function POST(req) {
  let connection;

  try {
    const body = await req.json(); // Parse the request body
    const {
      property_id,
      user_id,
      owner_id,
      no_of_months,
      amount,
      payment_method,
      payment_status,
      transaction_id,
    } = body;

    // Validation
    if (!property_id || !user_id || !owner_id || !amount || !payment_method) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Connect to Database
    connection = await connectDB();
    if (!connection) {
      return new Response(JSON.stringify({ error: "Database connection failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Start transaction
    await connection.beginTransaction();

    // Insert into payments table
    const insertQuery = `
      INSERT INTO payments 
      (property_id, user_id, owner_id, no_of_months, amount, payment_method, payment_status, transaction_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(insertQuery, [
      property_id,
      user_id,
      owner_id,
      no_of_months,
      amount,
      payment_method,
      payment_status,
      transaction_id,
    ]);

    // Update the properties table to set renter_id = user_id
    const updateQuery = `UPDATE properties SET renter_id = ? WHERE id = ?`;
    await connection.execute(updateQuery, [user_id, property_id]);

    // Commit transaction
    await connection.commit();

    return new Response(JSON.stringify({ message: "Payment recorded & property updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Database error:", error);

    if (connection) {
      await connection.rollback(); // Rollback changes if any error occurs
    }

    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  } finally {
    if (connection) await connection.end();
  }
}
