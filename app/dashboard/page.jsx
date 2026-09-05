import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import QuizAttempt from "@/models/QuizAttempt";
import Technology from "@/models/Technology";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  }

  await dbConnect();
  
  // Fetch user attempts
  const attempts = await QuizAttempt.find({ userId: session.user.id })
    .populate('technologyId', 'name icon color')
    .populate('themeId', 'title')
    .sort({ createdAt: -1 })
    .lean();

  const totalQuizzes = attempts.length;
  const avgScore = totalQuizzes > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzes)
    : 0;
  
  const highestScore = totalQuizzes > 0
    ? Math.max(...attempts.map(a => a.score))
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 mt-10">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back, {session.user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-slate-500 mt-2">Here is a summary of your recent quiz activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <ActivityIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestScore}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Attempts</h2>
        <Link href="/">
          <Button variant="outline" className="text-violet-600 border-violet-200 hover:bg-violet-50">Take a Quiz</Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead>Quiz</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map(attempt => (
                <TableRow key={attempt._id.toString()}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: attempt.technologyId?.color || '#eee' }}>
                        {attempt.technologyId?.icon && <img src={attempt.technologyId.icon.replace(/^\./, "")} className="w-5 h-5" alt="" />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{attempt.themeId?.title}</p>
                        <p className="text-xs text-slate-500">{attempt.technologyId?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(attempt.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${attempt.score >= 80 ? 'text-emerald-600' : attempt.score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                      {attempt.score}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/quiz/${attempt.technologyId?.slug}`}>
                      <Button variant="ghost" size="sm">Retake</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              
              {attempts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                    You haven't taken any quizzes yet. <Link href="/" className="text-violet-600 font-medium hover:underline">Start one now</Link>.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
