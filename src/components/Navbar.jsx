// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Link, useParams } from "react-router-dom";

const toggleMode = () => {
  return localStorage.getItem("darkMode") || "light";
};

const Navbar = () => {
  const { title } = useParams();
  const [theme, setTheme] = useState(toggleMode());

  // theme toggle function
  const handleThemeToggle = () => {
    const newTheme = theme === "dark-mode" ? "light" : "dark-mode";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("darkMode", theme);
  }, [theme]);

  return (
    <header className="header">
      <div className="header-container container">
        <div>{title && (
          <Link className='header-logo' to='/'>
            <figure>
              <img src={`/assets/icon-${title.toLowerCase()}.svg`} alt={`${title} icon`} />
            </figure>
            <span>{title}</span>
          </Link>
        )}</div>
        <div>
          <div className="dark-btn" onClick={handleThemeToggle}>
            <input type="checkbox" checked={theme === "dark-mode"} readOnly />
            <span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
