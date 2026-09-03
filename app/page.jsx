import MenuLinks from "@/components/MenuLinks";

export default function HomePage() {
  return (
    <section className="home-container container">
      <div className="home-content">
        <h1 className="hero-title">
          <span>Welcome to the</span>
          <span className="gradient-text">Frontend & Fullstack Quiz!</span>
        </h1>
        <p className="hero-subtitle">
          Test your knowledge across core technologies like HTML, CSS, JavaScript, React, Next.js, Node.js, TypeScript, and Git.
        </p>
      </div>
      <div className="home-nav-list">
        <MenuLinks />
      </div>
    </section>
  );
}
