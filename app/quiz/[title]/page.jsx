import Test from "@/components/Test";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import Theme from "@/models/Theme";
import Question from "@/models/Question";

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
    await dbConnect();
    
    // Find technology by name (case-insensitive)
    const technology = await Technology.findOne({ name: { $regex: new RegExp(`^${title}$`, "i") } }).lean();
    
    if (technology) {
      // Find the first theme for this technology
      const theme = await Theme.findOne({ technologyId: technology._id }).lean();
      
      if (theme) {
        // Find questions for this theme
        const questions = await Question.find({ themeId: theme._id }).sort({ order: 1 }).lean();
        
        // Map questions back to the format expected by the frontend
        const mappedQuestions = questions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.options[q.correctAnswer]
        }));
        
        quiz = {
          title: technology.name,
          icon: technology.icon,
          color: technology.color,
          questions: mappedQuestions
        };
      }
    }
  } catch (err) {
    console.error("Error reading quiz data from DB:", err);
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
