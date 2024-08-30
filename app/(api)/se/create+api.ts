import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      machine_id,
      name,
      location,
      status,
      designation,
      last_maintenance_date,
      image,
    } = body;

    if (!user_id || !machine_id || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      INSERT INTO recent_searches (
        user_id,
        machine_id,
        name,
        location,
        status,
        designation,
        last_maintenance_date,
        image
      ) VALUES (
        ${user_id},
        ${machine_id},
        ${name},
        ${location},
        ${status},
        ${designation},
        ${last_maintenance_date},
        ${image}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error inserting recent search:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
