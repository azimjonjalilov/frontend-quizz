"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Moon, Sun, User as UserIcon, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const params = useParams();
  const pathname = usePathname();
  const { data: session } = useSession();
  const title = params?.title ? decodeURIComponent(params.title) : null;
  const [isDark, setIsDark] = useState(true);

  // Exclude Navbar on Admin routes since Admin has its own Sidebar layout
  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            {title ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
                  <img
                    src={`/assets/icon-${title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}.svg`}
                    alt={`${title} icon`}
                    className="h-6 w-6"
                  />
                </div>
                <span className="text-xl font-semibold text-slate-900 dark:text-white hidden sm:inline-block">{title}</span>
              </>
            ) : (
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                IT Quiz
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:inline-block">
                {session.user.name}
              </span>
              
              {session.user.role === 'admin' && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="hidden sm:flex border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-900/20">
                    <Settings className="w-4 h-4 mr-2" /> Admin Panel
                  </Button>
                </Link>
              )}
              
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                  <UserIcon className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-900/20">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 dark:text-slate-300">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">Sign up</Button>
              </Link>
            </div>
          )}

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-1 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle Dark Mode"
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform ${!isDark ? 'bg-white shadow-sm' : ''}`}>
              <Sun className={`h-4 w-4 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
            </div>
            <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform ${isDark ? 'bg-slate-800 shadow-sm' : ''}`}>
              <Moon className={`h-4 w-4 ${isDark ? 'text-violet-400' : 'text-slate-500'}`} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
