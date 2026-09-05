import MenuLinks from "@/components/MenuLinks";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Welcome to the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              IT Quiz Platform
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            Test and improve your knowledge across core technologies like HTML, CSS, JavaScript, React, Next.js, Python, and more.
          </p>
          <div className="pt-4">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Choose a subject to get started</p>
            <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="w-full max-w-md lg:ml-auto">
          <MenuLinks />
        </div>
      </div>
    </div>
  );
}
