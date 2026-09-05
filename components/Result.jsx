import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Home } from "lucide-react";

function Result({ title, color, icon, correctAnswerCount, questions }) {
  const iconPath = icon ? icon.replace(/^\./, "") : `/assets/icon-${title.toLowerCase()}.svg`;
  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswerCount / totalQuestions) * 100);

  let feedbackMessage = "Keep practicing!";
  let feedbackBadge = "Good Effort 👍";

  if (percentage >= 90) {
    feedbackMessage = "Outstanding! You have mastered this topic.";
    feedbackBadge = "Expert Mastery 🏆";
  } else if (percentage >= 70) {
    feedbackMessage = "Great job! You have a solid understanding.";
    feedbackBadge = "Great Score 🎉";
  } else if (percentage >= 50) {
    feedbackMessage = "Nice try! Review a bit more to boost your score.";
    feedbackBadge = "Passed 🎯";
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Quiz completed <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              You scored...
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {feedbackMessage}
          </p>
        </div>

        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 p-8 md:p-12 flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: color || '#f1f5f9' }}
              >
                <img src={iconPath} alt={title} className="w-8 h-8 object-contain" />
              </div>
              <span className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</span>
            </div>

            <div className="text-8xl md:text-9xl font-bold text-slate-900 dark:text-white mb-2">
              {correctAnswerCount}
            </div>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">
              out of {totalQuestions}
            </p>

            <div className="px-6 py-2 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 font-medium text-lg w-max mb-2">
              {percentage}% Score — {feedbackBadge}
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href={`/quiz/${encodeURIComponent(title)}`} className="w-full sm:flex-1">
              <Button className="w-full h-14 text-lg bg-violet-600 hover:bg-violet-700">
                <RotateCcw className="w-5 h-5 mr-2" /> Play Again
              </Button>
            </Link>
            <Link href="/" className="w-full sm:flex-1">
              <Button variant="outline" className="w-full h-14 text-lg">
                <Home className="w-5 h-5 mr-2" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
