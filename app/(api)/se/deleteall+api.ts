import { neon } from "@neondatabase/serverless";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { user_id } = body;

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "Missing required field: user_id" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      DELETE FROM recent_searches
      WHERE user_id = ${user_id}
      RETURNING *;
    `;

    if (response.length === 0) {
      return new Response(
        JSON.stringify({ message: "No records found to delete" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        message: "All records deleted successfully",
        deleted: response,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting recent searches:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
