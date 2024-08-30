import { neon } from "@neondatabase/serverless";

export async function POST(request: Request, { query }: { query: string }) {
  if (!query) {
    return new Response(
      JSON.stringify({ error: "Missing query parameter (machine_id)" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const body = await request.json();
    const { report_title, reported_by, report_problem, report_priority } = body;

    if (!report_title || !reported_by || !report_problem || !report_priority) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      INSERT INTO reportess (
        id,
        report_title, 
        reported_by, 
        report_problem,
        priority
      ) VALUES (
        ${query},
        ${report_title},
        ${reported_by},
        ${report_problem},
        ${report_priority}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
