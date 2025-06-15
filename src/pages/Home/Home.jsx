import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // pour les styles

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Overlay sombre par-dessus l'image */}
      <div className="overlay">
        {/* Header */}
        <header className="header">
          <div className="logo">⚽ Five Center</div>
        </header>

        {/* Slogan + bouton */}
        <main className="main-content">
          <h1>Réservez votre terrain de foot 5 en 3 clics !</h1>
          <ul>
            <li>✅ Créez un compte</li>
            <li>✅ Choisissez un créneau</li>
            <li>✅ Payez et jouez</li>
          </ul>
          <Link to="/login" className="cta-button">Commencer</Link>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
