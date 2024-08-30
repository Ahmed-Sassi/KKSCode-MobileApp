import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      taskTitle,
      description,
      selectedPriority,
      startDate,
      endDate,
      taskStatus,
    } = body;

    if (
      !taskTitle ||
      !description ||
      !selectedPriority ||
      !startDate ||
      !endDate
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      INSERT INTO tasktest (
        taskTitle, 
        description, 
        priority, 
        startDate, 
        endDate,
        status
      ) VALUES (
        ${taskTitle},
        ${description},
        ${selectedPriority},
        ${startDate},
        ${endDate},
        ${taskStatus}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
