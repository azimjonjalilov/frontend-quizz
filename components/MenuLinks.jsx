import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import Theme from "@/models/Theme";
import Question from "@/models/Question";

export default async function MenuLinks() {
  let quizzes = [];
  try {
    await dbConnect();
    // Fetch all technologies
    const technologies = await Technology.find({ isPublished: true }).sort({ order: 1 }).lean();
    
    // For each technology, fetch its default theme and question count
    // (Simulating the old structure for the UI)
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
        questions: new Array(questionCount).fill({}) // Fake array just for length calculation in the UI
      });
    }
  } catch (err) {
    console.error("Failed to read quizzes data from DB:", err);
  }

  return (
    <div className="menu-list">
      {quizzes.map((item) => {
        const iconPath = item.icon ? item.icon.replace(/^\./, "") : "";
        const questionCount = item.questions ? item.questions.length : 0;
        return (
          <Link
            href={`/quiz/${encodeURIComponent(item.title)}`}
            key={item.title}
            className="menu-card glass-card"
          >
            <figure
              style={{
                backgroundColor: item.color || "var(--badge-bg)",
                width: 52,
                height: 52,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img src={iconPath} alt={item.title} width={32} height={32} />
            </figure>
            <div className="menu-card-info">
              <span className="menu-card-title">{item.title}</span>
              <span className="menu-card-count">{questionCount} Questions</span>
            </div>
            <svg
              className="chevron-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        );
      })}
    </div>
  );
}
