import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { query }: { query: string }) {
  if (!query)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT * FROM test WHERE id = ${query} `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching recent machines:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
