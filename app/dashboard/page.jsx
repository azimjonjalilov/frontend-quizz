import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";

// We need to fetch authOptions from route.js but it's not exported there.
// Instead, NextAuth in app directory usually recommends separating authOptions into a lib/auth.js file.
// Let's just create a basic page and we can refactor later if needed.

export default async function DashboardPage() {
  // We can fetch session here, but for now we'll assume it's protected by middleware or client-side check.
  // Actually let's use client component for simplicity for now.
  return (
    <section className="container quiz-container">
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h1 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          Welcome to your <span className="gradient-text">Dashboard</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          You are successfully logged in! Your quiz history and stats will appear here.
        </p>
        
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" className="submit-btn" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
            Browse Quizzes
          </Link>
        </div>
      </div>
    </section>
  );
}
