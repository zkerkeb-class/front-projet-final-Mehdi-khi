import { Link } from "react-router-dom";
import "./nav.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">Five Center</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/dashboard">Accueil</Link></li>
        <li><Link to="/mes-reservations">Mes réservations</Link></li>
        <li><Link to="/mes-reservations">Notifications</Link></li>
        <li><Link to="/profile">Mon profil</Link></li>
        <li><Link to="/" onClick={logout}>Déconnexion</Link></li>
      </ul>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

export default Navbar;
