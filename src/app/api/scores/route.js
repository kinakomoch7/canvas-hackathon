import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courseId = 50836;

    const res = await fetch(
      `https://nu.instructure.com/api/v1/courses/${courseId}/assignments?per_page=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANVAS_TOKEN}`,
        },
      }
    );
    const data = await res.json();

    const assignmentList = data.map((assignment) => {
      return {
        id: assignment.id,
        name: assignment.name,
        fullScore: assignment.points_possible,
      };
    });

    const assignmentScores = await Promise.all(
      assignmentList.map(async (assignment) => {
        const res = await fetch(
          `https://nu.instructure.com/api/v1/courses/${courseId}/assignments/${assignment.id}/submissions/self`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANVAS_TOKEN}`,
            },
          }
        );
        const data = await res.json();

        const score = data.score || data.score === undefined ? 0 : data.score;

        return {
          id: assignment.id,
          name: assignment.name,
          score: data.score,
          fullScore: assignment.fullScore,
        };
      })
    );

    return NextResponse.json(assignmentScores);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
