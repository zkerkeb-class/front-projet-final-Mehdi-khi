import React from "react";
import terrains from "../Data/terrains";
import "./D.css"; // tu peux créer le style plus tard

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <h2>Bienvenue sur votre tableau de bord</h2>
      <p>Voici les terrains disponibles :</p>

      <div className="terrain-list">
        {terrains.map((terrain) => (
          <div className="terrain-card" key={terrain.id}>
             <img src={terrain.image} alt={terrain.nom} className="terrain-image" />

            <h3>{terrain.nom}</h3>
            <p>Type : {terrain.type}</p>
            <p>Climatisation : {terrain.clim ? "Oui" : "Non"}</p>
            <p>Surface : {terrain.surface}</p>
           
            <button onClick={() => console.log(`Réserver ${terrain.nom}`)}>
              Réserver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
