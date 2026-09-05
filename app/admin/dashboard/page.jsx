import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Technology from "@/models/Technology";
import Theme from "@/models/Theme";
import Question from "@/models/Question";
import QuizAttempt from "@/models/QuizAttempt";
import { Users, BookOpen, Layers, Target, Activity } from "lucide-react";

export default async function AdminDashboard() {
  await dbConnect();

  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalTechnologies = await Technology.countDocuments();
  const totalThemes = await Theme.countDocuments();
  const totalQuestions = await Question.countDocuments();
  const totalAttempts = await QuizAttempt.countDocuments();

  const attempts = await QuizAttempt.find({}, 'score').lean();
  const avgScore = attempts.length > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.score, 0) / attempts.length)
    : 0;

  const stats = [
    { label: "Total Students", value: totalStudents, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Technologies", value: totalTechnologies, icon: Layers, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { label: "Themes", value: totalThemes, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { label: "Questions", value: totalQuestions, icon: Target, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-900/30" },
    { label: "Quiz Attempts", value: totalAttempts, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "Average Score", value: `${avgScore}%`, icon: Activity, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome to your admin panel. Here is what is happening today.</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className={`p-4 rounded-full ${stat.bg}`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
