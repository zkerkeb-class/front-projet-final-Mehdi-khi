import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import "./D.css";
import { useNavigate } from "react-router-dom";

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
        <h2>Bienvenue {user?.userName || "!"}</h2>
        <p>Voici les terrains disponibles :</p>

        <div className="terrain-list">
  {terrains.map((terrain) => (
    <div className="terrain-card" key={terrain.id}>
      <img src={`http://localhost:3000${terrain.image}`} alt={terrain.nom} className="terrain-image" />
      <h3>{terrain.nom}</h3>
      <p>Type : {terrain.type}</p>
      <p>Climatisation : {terrain.clim ? "Oui" : "Non"}</p>
      <p>Surface : {terrain.surface}</p>
      <button onClick={() => navigate(`/reservation/${terrain.id}`)}>
        Réserver
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default DashboardPage;
