import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import Theme from "@/models/Theme";
import Question from "@/models/Question";
import { ChevronRight } from "lucide-react";

export default async function MenuLinks() {
  let quizzes = [];
  try {
    await dbConnect();
    const technologies = await Technology.find({ isPublished: true }).sort({ order: 1 }).lean();
    
    for (let tech of technologies) {
      const themes = await Theme.find({ technologyId: tech._id }).lean();
      let questionCount = 0;
      if (themes.length > 0) {
        questionCount = await Question.countDocuments({ themeId: themes[0]._id });
      }
      
      quizzes.push({
        title: tech.name,
        icon: tech.icon,
        color: tech.color,
        questions: new Array(questionCount).fill({}) 
      });
    }
  } catch (err) {
    console.error("Failed to read quizzes data from DB:", err);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {quizzes.map((item) => {
        const iconPath = item.icon ? item.icon.replace(/^\./, "") : "";
        const questionCount = item.questions ? item.questions.length : 0;
        
        return (
          <Link
            href={`/quiz/${encodeURIComponent(item.title)}`}
            key={item.title}
            className="group flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: item.color || '#f1f5f9' }}
              >
                {iconPath && <img src={iconPath} alt={item.title} className="w-7 h-7 object-contain" />}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {item.title}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {questionCount} Questions
                </span>
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-violet-50 dark:group-hover:bg-violet-900/30 transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
