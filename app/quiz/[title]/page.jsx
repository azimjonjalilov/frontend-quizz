import Test from "@/components/Test";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const title = decodeURIComponent(params.title);
  return {
    title: `Quiz - ${title}`,
  };
}

export default async function QuizPage({ params }) {
  const title = decodeURIComponent(params.title);

  let quiz = null;
  try {
    const filePath = path.join(process.cwd(), "data", "db.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);
    const quizzes = json.quizzes || [];
    quiz = quizzes.find((q) => q.title.toLowerCase() === title.toLowerCase());
  } catch (err) {
    console.error("Error reading quiz data:", err);
  }

  if (!quiz) {
    notFound();
  }

  return (
    <section className="container quiz-container">
      <Test questions={quiz} />
    </section>
  );
}
