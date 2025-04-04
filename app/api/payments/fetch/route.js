import connectDB from "@/config/database";
export const dynamic = 'force-dynamic'
export async function GET(req) {
  let connection; // Declare connection variable for proper closure

  try {
    const url = new URL(req.url);
    const propertyId = url.searchParams.get("propertyId");

    if (!propertyId) {
      return new Response(JSON.stringify({ error: "Missing propertyId" }), { status: 400 });
    }

    connection = await connectDB();

    // Fetch property details
    const [propertyRows] = await connection.execute(
      `SELECT id, owner_id, renter_id, name, type, description, street, city, state, zipcode, country,
              number_of_units, rates, seller_name, seller_email, seller_phone, images, created_at, updated_at, due_date
       FROM properties WHERE id = ?`, 
      [propertyId]
    );

    if (propertyRows.length === 0) {
      return new Response(JSON.stringify({ error: "Property not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ property: propertyRows[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching property details:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });

  } finally {
    // Ensure connection is closed even if an error occurs
    if (connection) {
      await connection.end();
    }
  }
}
