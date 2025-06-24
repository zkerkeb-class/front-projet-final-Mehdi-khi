import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">⚽ Five Center</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Accueil</Link></li>
        <li><Link to="/mes-reservations">Mes réservations</Link></li>
        <li><button onClick={handleLogout}>Déconnexion</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
