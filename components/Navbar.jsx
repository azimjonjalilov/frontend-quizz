"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const getSavedTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("darkMode") || "dark-mode";
  }
  return "dark-mode";
};

const Navbar = () => {
  const params = useParams();
  const { data: session } = useSession();
  const title = params?.title ? decodeURIComponent(params.title) : null;
  const [theme, setTheme] = useState("dark-mode");

  useEffect(() => {
    setTheme(getSavedTheme());
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark-mode" ? "light" : "dark-mode";
    setTheme(newTheme);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.className = theme;
      localStorage.setItem("darkMode", theme);
    }
  }, [theme]);

  const slugifiedTitle = title
    ? title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")
    : "";

  return (
    <header className="header">
      <div className="header-container container">
        <div>
          {title ? (
            <Link className="header-logo" href="/">
              <figure style={{ backgroundColor: "var(--primary-purple-light)" }}>
                <img
                  src={`/assets/icon-${slugifiedTitle}.svg`}
                  alt={`${title} icon`}
                />
              </figure>
              <span>{title}</span>
            </Link>
          ) : (
            <Link className="header-logo" href="/">
              <span>Frontend Quizz</span>
            </Link>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{session.user.name}</span>
              <Link href="/dashboard" style={{ fontSize: '0.875rem', color: 'var(--primary-purple)' }}>Dashboard</Link>
              <button onClick={() => signOut()} style={{ fontSize: '0.875rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--error-color)' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: '500', padding: '0.5rem 1rem', background: 'var(--primary-purple)', color: 'white', borderRadius: 'var(--radius-sm)' }}>
              Login
            </Link>
          )}

          <button
            className="theme-switch"
            onClick={handleThemeToggle}
            aria-label="Toggle Dark Mode"
            type="button"
          >
            <span className="icon-sun"></span>
            <div className="switch-pill">
              <div className="switch-dot"></div>
            </div>
            <span className="icon-moon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
