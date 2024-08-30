import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      taskId,
      taskTitle,
      description,
      selectedPriority,
      startDate,
      endDate,
      taskStatus,
    } = body;

    console.log(body);

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
      UPDATE tasktest
      SET 
        taskTitle = ${taskTitle}, 
        description = ${description}, 
        priority = ${selectedPriority}, 
        startDate = ${startDate}, 
        endDate = ${endDate},
        status = ${taskStatus}
      WHERE id = ${taskId}
      RETURNING *;
    `;

    if (response.length === 0) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
