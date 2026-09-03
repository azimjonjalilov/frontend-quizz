import Link from "next/link";
import fs from "fs/promises";
import path from "path";

export default async function MenuLinks() {
  let quizzes = [];
  try {
    const filePath = path.join(process.cwd(), "data", "db.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);
    quizzes = json.quizzes || [];
  } catch (err) {
    console.error("Failed to read quizzes data:", err);
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
