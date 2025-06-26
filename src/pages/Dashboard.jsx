import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import "./D.css";

const DashboardPage = () => {
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
        <h2>Bonjour {user?.userName || ""}, bienvenue sur Five Center</h2>
        <p className="subtitle">Réservez votre terrain de foot en quelques clics 👇</p>

        <div className="terrain-list">
          {terrains.map((terrain) => (
            <div className="terrain-card fade-in" key={terrain._id}>
              <div className="terrain-image-wrapper">
                <img
                  src={`http://localhost:3000${terrain.image}`}
                  alt={terrain.nom}
                  className="terrain-image"
                />
                {terrain.clim && <span className="badge">Climatisé</span>}
              </div>

              <h3>{terrain.nom}</h3>
              <p>Type : {terrain.type}</p>
              <p className={terrain.clim ? "clim-ok" : "clim-no"}>
                Climatisation : {terrain.clim ? "Oui" : "Non"}
              </p>
              <p>Surface : {terrain.surface}</p>

              <div className="card-footer">
                <span className="terrain-price">{terrain.prix} €</span>
                <button onClick={() => navigate(`/reservation/${terrain._id}`)}>
                  Réserver
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
