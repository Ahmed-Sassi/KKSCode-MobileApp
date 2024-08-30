import { neon } from "@neondatabase/serverless";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { user_id, machine_id } = body;

    console.log(body);

    if (!user_id || !machine_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      DELETE FROM recent_searches
      WHERE user_id = ${user_id} AND machine_id = ${machine_id}
      RETURNING *;
    `;

    if (response.length === 0) {
      return new Response(
        JSON.stringify({ message: "No record found to delete" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Record deleted successfully",
        deleted: response,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting recent search:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
