import Link from "next/link";

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
    <div className="test-grid">
      <div>
        <h1 className="hero-title">
          <span>Quiz completed</span>
          <span className="gradient-text">You scored...</span>
        </h1>
        <p className="hero-subtitle">{feedbackMessage}</p>
      </div>

      <div>
        <div className="result-card glass-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <figure
              style={{
                backgroundColor: color || "var(--primary-purple-light)",
                width: 44,
                height: 44,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={iconPath} alt={title} width={28} height={28} />
            </figure>
            <span style={{ fontSize: 24, fontWeight: 500 }}>{title}</span>
          </div>

          <div className="result-score-badge">{correctAnswerCount}</div>
          <p
            style={{
              fontSize: 18,
              color: "var(--text-muted)",
              marginBottom: 20,
            }}
          >
            out of {totalQuestions}
          </p>

          <span className="result-percentage-pill">
            {percentage}% Score — {feedbackBadge}
          </span>
        </div>

        <div className="result-actions">
          <Link className="btn-primary" href={`/quiz/${encodeURIComponent(title)}`}>
            Play Again
          </Link>
          <Link className="btn-secondary" href="/">
            Explore Other Subjects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
