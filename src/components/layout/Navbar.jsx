import { Link } from "react-router-dom";
import "./nav.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();
  const { i18n, t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">Five Center</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/dashboard">{t("navbar.home")}</Link></li>
        <li><Link to="/mes-reservations">{t("navbar.reservations")}</Link></li>
        <li><Link to="/notifications">{t("navbar.notifications")}</Link></li>
        <li><Link to="/profile">{t("navbar.profile")}</Link></li>
        <li><Link to="/" onClick={logout}>{t("navbar.logout")}</Link></li>
      </ul>

<div className="navbar-controls">
  <button className="theme-toggle" onClick={toggleTheme}>
    {theme === "light" ? "🌙" : "☀️"}
  </button>

  <select
    onChange={(e) => {
      i18n.changeLanguage(e.target.value);
      localStorage.setItem("lang", e.target.value);
    }}
    value={i18n.language}
  >
    <option value="fr">FR</option>
    <option value="en">EN</option>
  </select>
</div>

      
    </nav>
  );
};

export default Navbar;
