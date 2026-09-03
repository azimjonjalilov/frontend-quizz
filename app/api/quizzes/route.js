import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");

    const filePath = path.join(process.cwd(), "data", "db.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);

    let quizzes = json.quizzes || [];

    if (title) {
      quizzes = quizzes.filter(
        (q) => q.title.toLowerCase() === title.toLowerCase()
      );
    }

    return NextResponse.json({ data: quizzes });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load quizzes: " + error.message },
      { status: 500 }
    );
  }
}
