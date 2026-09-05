import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import Theme from "@/models/Theme";
import Question from "@/models/Question";

export async function GET() {
  try {
    await dbConnect();
    
    // Check if we already seeded to avoid duplicates
    const existingTech = await Technology.countDocuments();
    if (existingTech > 0) {
      return NextResponse.json({ message: "Database already seeded. Delete collections to re-seed." }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "db.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);
    const quizzes = json.quizzes || [];

    for (const [index, quiz] of quizzes.entries()) {
      // 1. Create Technology
      const technology = await Technology.create({
        name: quiz.title,
        slug: quiz.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        icon: quiz.icon,
        color: quiz.color,
        order: index
      });

      // 2. Create a default Theme for this Technology
      const theme = await Theme.create({
        technologyId: technology._id,
        title: `${quiz.title} Basics`,
        slug: `${quiz.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-basics`,
        order: 0
      });

      // 3. Create Questions
      const questionsToInsert = quiz.questions.map((q, qIndex) => {
        const correctIndex = q.options.findIndex(opt => opt === q.answer);
        return {
          themeId: theme._id,
          question: q.question,
          options: q.options,
          correctAnswer: correctIndex !== -1 ? correctIndex : 0,
          difficulty: 'medium', // Default difficulty
          order: qIndex
        };
      });

      await Question.insertMany(questionsToInsert);
    }

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
