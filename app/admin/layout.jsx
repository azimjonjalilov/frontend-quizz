import Link from "next/link";
import { LayoutDashboard, MonitorPlay, Layers, FileQuestion, Users, Settings, LogOut } from "lucide-react";
import { getServerSession } from "next-auth/next";

export default async function AdminLayout({ children }) {
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Technologies", href: "/admin/technologies", icon: MonitorPlay },
    { name: "Themes", href: "/admin/themes", icon: Layers },
    { name: "Questions", href: "/admin/questions", icon: FileQuestion },
    { name: "Students", href: "/admin/students", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            IT Quiz Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            <LogOut className="w-5 h-5" />
            Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header (optional) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-violet-600">Admin</h2>
          {/* Mobile menu button would go here */}
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
