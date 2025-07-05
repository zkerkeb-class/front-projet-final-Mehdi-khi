import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ import ajouté
import "./style.css";

const DashboardPage = () => {
  const { t } = useTranslation(); // ✅ hook utilisé en haut du composant
  const [user, setUser] = useState(null);
  const [terrains, setTerrains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/terrains");
        const data = await res.json();
        setTerrains(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des terrains :", err);
      }
    };

    fetchTerrains();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h2>{t("dashboard.welcome", { name: user?.userName || "" })}</h2>
        <p className="subtitle">{t("dashboard.subtitle")}</p>

        <div className="terrain-list">
          {terrains.map((terrain) => (
            <div className="terrain-card fade-in" key={terrain._id}>
              <div className="terrain-image-wrapper">
                <img
                  src={`http://localhost:3000${terrain.image}`}
                  alt={terrain.nom}
                  className="terrain-image"
                />
                {terrain.clim && <span className="badge">{t("dashboard.climatised")}</span>}
              </div>

              <h3>{terrain.nom}</h3>
              <p>{t("dashboard.type")} : {terrain.type}</p>
              <p className={terrain.clim ? "clim-ok" : "clim-no"}>
                {t("dashboard.clim")} : {terrain.clim ? t("dashboard.clim_yes") : t("dashboard.clim_no")}
              </p>
              <p>{t("dashboard.surface")} : {terrain.surface}</p>

              <div className="card-footer">
                <span className="terrain-price">{terrain.prix} €</span>
                <button onClick={() => navigate(`/reservation/${terrain._id}`)}>
                  {t("dashboard.book")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
