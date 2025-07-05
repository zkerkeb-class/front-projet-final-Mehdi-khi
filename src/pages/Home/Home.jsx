import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HomePage.css';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <div className="overlay">
        <header className="header">
          <div className="logo">⚽ Five Center</div>
        </header>

        <main className="main-content">
          <h1>{t("home.slogan")}</h1>
          <ul>
            <li>{t("home.step1")}</li>
            <li>{t("home.step2")}</li>
            <li>{t("home.step3")}</li>
          </ul>
          <Link to="/login" className="cta-button">{t("home.start")}</Link>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
