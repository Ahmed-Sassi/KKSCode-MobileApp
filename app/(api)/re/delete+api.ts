import { neon } from "@neondatabase/serverless";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body; // Destructure the id from the body

    // Check if ID is provided
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    // Execute the DELETE command
    const response = await sql`
      DELETE FROM reportess WHERE id = ${id}
      RETURNING *;  
    `;

    if (response.length === 0) {
      return new Response(
        JSON.stringify({ error: "No report found with this ID" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Report deleted successfully",
        deleted: response,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting report:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
