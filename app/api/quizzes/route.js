import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import Theme from "@/models/Theme";
import Question from "@/models/Question";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");

    await dbConnect();

    let query = { isPublished: true };
    if (title) {
      query.name = { $regex: new RegExp(`^${title}$`, "i") };
    }

    const technologies = await Technology.find(query).sort({ order: 1 }).lean();
    let quizzes = [];

    for (let tech of technologies) {
      const themes = await Theme.find({ technologyId: tech._id }).lean();
      let mappedQuestions = [];
      
      if (themes.length > 0) {
        const questions = await Question.find({ themeId: themes[0]._id }).sort({ order: 1 }).lean();
        mappedQuestions = questions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.options[q.correctAnswer]
        }));
      }

      quizzes.push({
        title: tech.name,
        icon: tech.icon,
        color: tech.color,
        questions: mappedQuestions
      });
    }

    return NextResponse.json({ data: quizzes });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load quizzes: " + error.message },
      { status: 500 }
    );
  }
}
