import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import "./cr.css"; // Assurez-vous d'avoir ce fichier CSS pour le style

const CreneauxPage = () => {
  const { terrainId } = useParams();
  const userId = localStorage.getItem("userId");
  const [creneaux, setCreneaux] = useState([]);
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCreneaux = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/creneaux/${terrainId}`);
        const data = await res.json();
        setCreneaux(data);
      } catch (err) {
        console.error("Erreur récupération créneaux", err);
      }
    };

    fetchCreneaux();
  }, [terrainId]);
  const [terrain, setTerrain] = useState(null);

useEffect(() => {
  const fetchTerrain = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/terrains/${terrainId}`);
      const data = await res.json();
      setTerrain(data);
    } catch (err) {
      console.error("Erreur récupération terrain", err);
    }
  };

  fetchTerrain();
}, [terrainId]);


 const payerAvecStripe = async (creneauId) => {
  if (!userId) {
    alert("Vous devez être connecté pour réserver.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        montant: 30, // prix du créneau en euros
        userId,
        creneauId,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = data.url;
    } else {
      alert("Erreur lors de la création du paiement");
    }
  } catch (err) {
    console.error("Erreur Stripe :", err);
    alert("Erreur réseau");
  }
};


  return (
  <>
    <Navbar />
    <div className="creneaux-page">
      <div className="left">
        <div className="terrain-image-box">
          <img
            src={`http://localhost:3000${terrain?.image}`}
            alt={terrain?.nom || "terrain"}
            className="terrain-image"
          />
          <div className="terrain-infos">
            {terrain && (
            <>
              <h2>{terrain.nom}</h2>
              <p>Type : {terrain.type}</p>
              <p>Climatisation : {terrain.clim ? "Oui" : "Non"}</p>
              <p>Surface : {terrain.surface}</p>
              <p>Prix : {terrain.prix} €</p>
            </>
          )}

          </div>
        </div>
      </div>

      <div className="right">
        <h3>Choisissez un créneau disponible 👇</h3>
        {message && <p className="success-msg">{message}</p>}

        <div className="creneaux-grid">
          {Array.isArray(creneaux) && creneaux.map((creneau) => (
            <div
              key={creneau._id}
              className={`creneau-card ${creneau.disponible ? "dispo" : "indispo"}`}
            >
              <div className="creneau-info">
                <strong>{creneau.date}</strong>
                <p>à</p>
                <span>{creneau.heure}</span>
              </div>
              {creneau.disponible ? (
                <button onClick={() => payerAvecStripe(creneau._id)}>Réserver</button>
              ) : (
                <span className="reserved-tag">Réservé</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  </>
);

};

export default CreneauxPage;
