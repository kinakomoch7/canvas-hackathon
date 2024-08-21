import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`https://nu.instructure.com/api/v1/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANVAS_TOKEN}`,
      },
    });
    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
