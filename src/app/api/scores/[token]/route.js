import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { token } = params;

  try {
    // ユーザーのコース一覧を取得
    const courseRes = await fetch(`https://nu.instructure.com/api/v1/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const courses = await courseRes.json();

    // 各コースの課題情報を取得
    const courseAssignments = await Promise.all(
      courses.map(async (course) => {
        const assignmentRes = await fetch(
          `https://nu.instructure.com/api/v1/courses/${course.id}/assignments?per_page=100`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const assignments = await assignmentRes.json();

        // 課題ごとの詳細を取得
        const assignmentScores = await Promise.all(
          assignments.map(async (assignment) => {
            const submissionRes = await fetch(
              `https://nu.instructure.com/api/v1/courses/${course.id}/assignments/${assignment.id}/submissions/self`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const submission = await submissionRes.json();

            const includeInGrades =
              assignment.grading_type !== "pass_fail" && assignment.published;

            return {
              id: assignment.id,
              name: assignment.name,
              score: submission.score,
              fullScore: assignment.points_possible,
              isSubmitted: submission.submitted_at !== null,
              submittedDueDate: assignment.due_at,
              includeInGrades: includeInGrades,
            };
          })
        );

        const sumScore = assignmentScores.reduce((acc, curr) => {
          return curr.score !== null && curr.score !== undefined
            ? acc + curr.score
            : acc;
        }, 0);

        const sumFullScore = assignmentScores.reduce((acc, curr) => {
          return acc + curr.fullScore;
        }, 0);

        const sumFullAlreadyScored = assignmentScores.reduce((acc, curr) => {
          return curr.score === null ? acc : acc + curr.fullScore;
        }, 0);

        const submissionPercentage =
          sumFullScore != 0
            ? (
                (assignmentScores.reduce((acc, curr) => {
                  return curr.isSubmitted ? acc + 1 : acc;
                }, 0) /
                  assignmentScores.length) *
                100
              ).toFixed(2)
            : -1;

        return {
          courseId: course.id,
          courseName: course.name,
          sumScorePercentage: ((sumScore / sumFullScore) * 100).toFixed(2),
          sumScore: sumScore,
          sumFullScore: sumFullScore,
          sumFullAlreadyScored: sumFullAlreadyScored,
          submissionPercentage: submissionPercentage,
          details: assignmentScores,
        };
      })
    );

    return NextResponse.json(courseAssignments);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
