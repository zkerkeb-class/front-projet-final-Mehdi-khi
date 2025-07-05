import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import "./style.css"; 

const CreneauxPage = () => {
  const { t } = useTranslation();
  const { terrainId } = useParams();
  const userId = localStorage.getItem("userId");
  const [creneaux, setCreneaux] = useState([]);
  const [terrain, setTerrain] = useState(null);
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
      alert(t("creneaux.login_required"));
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ montant: 30, userId, creneauId }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.url;
      } else {
        alert(t("creneaux.error_creating_payment"));
      }
    } catch (err) {
      console.error("Erreur Stripe :", err);
      alert(t("creneaux.network_error"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="creneaux-page">
        <div className="left">
          <div className="terrain-image-box">
            <img src={`http://localhost:3000${terrain?.image}`} alt={terrain?.nom || "terrain"} className="terrain-image" />
            <div className="terrain-infos">
              {terrain && (
                <>
                  <h2>{terrain.nom}</h2>
                  <p>{t("creneaux.type")}: {terrain.type}</p>
                  <p>{t("creneaux.clim")}: {terrain.clim ? t("creneaux.yes") : t("creneaux.no")}</p>
                  <p>{t("creneaux.surface")}: {terrain.surface}</p>
                  <p>{t("creneaux.price")}: {terrain.prix} €</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="right">
          <h3>{t("creneaux.choose")}</h3>
          {message && <p className="success-msg">{message}</p>}

          <div className="creneaux-grid">
            {Array.isArray(creneaux) && creneaux.map((c) => (
              <div key={c._id} className={`creneau-card ${c.disponible ? "dispo" : "indispo"}`}>
                <div className="creneau-info">
                  <strong>{c.date}</strong>
                  <p>à</p>
                  <span>{c.heure}</span>
                </div>
                {c.disponible ? (
                  <button onClick={() => payerAvecStripe(c._id)}>{t("creneaux.book")}</button>
                ) : (
                  <span className="reserved-tag">{t("creneaux.reserved")}</span>
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
