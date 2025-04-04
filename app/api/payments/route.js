import connectDB from "@/config/database";

export async function GET() {
  let connection; // Declare connection variable for proper closure

  try {
    connection = await connectDB();

    const [rows] = await connection.execute(`
      SELECT 
        p.id, 
        p.user_id, 
        p.owner_id, 
        p.amount, 
        p.payment_method, 
        p.payment_status, 
        p.no_of_months, 
        p.transaction_id, 
        p.payment_date,
        pr.name AS property_name
      FROM payments p
      JOIN properties pr ON p.property_id = pr.id
    `);

    return new Response(JSON.stringify(rows), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { 
      status: 500 
    });

  } finally {
    // Ensure connection is closed even if an error occurs
    if (connection) {
      await connection.end();
    }
  }
}
