import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar";
import "./style.css";

const Reservation = () => {
  const { t } = useTranslation();
  const [reservations, setReservations] = useState([]);
  const [creneauxDisponibles, setCreneauxDisponibles] = useState([]);
  const [terrainSelectionne, setTerrainSelectionne] = useState(null);
  const [creneauAModifier, setCreneauAModifier] = useState(null);
  const [creneauChoisi, setCreneauChoisi] = useState(null);
  const [filtre, setFiltre] = useState("toutes"); // "toutes", "passees", "a_venir"
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    const fetchReservations = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/reservations/${userId}`);
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error("Erreur récupération réservations:", err);
      }
    };
    fetchReservations();
  }, [userId]);

  const handleAnnuler = async (id) => {
    const confirm = window.confirm(t("reservation.confirm_cancel"));
    if (!confirm) return;
    await fetch(`http://localhost:3000/api/reservations/${id}`, { method: "DELETE" });
    setReservations(reservations.filter(r => r._id !== id));
  };

  const handleModifier = async (reservation) => {
    if (!reservation.creneauId?.terrainId?._id) return;
    setCreneauAModifier(reservation);
    setTerrainSelectionne(reservation.creneauId.terrainId._id);
    const res = await fetch(`http://localhost:3000/api/creneaux/${reservation.creneauId.terrainId._id}`);
    const data = await res.json();
    // ne garder que les créneaux disponibles
    setCreneauxDisponibles(data.filter(c => c.disponible));
  };

  const confirmerModification = async () => {
    if (!creneauChoisi || !creneauAModifier) return;
    await fetch(`http://localhost:3000/api/reservations/${creneauAModifier._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nouveauCreneauId: creneauChoisi }),
    });
    window.location.reload();
  };

  const estPasse = (date, heure) => {
    const now = new Date();
    const d = new Date(`${date}T${heure}`);
    return d < now;
  };

  const filtrerReservations = () => {
    if (filtre === "passees") {
      return reservations.filter(r => estPasse(r.creneauId.date, r.creneauId.heure));
    } else if (filtre === "a_venir") {
      return reservations.filter(r => !estPasse(r.creneauId.date, r.creneauId.heure));
    }
    return reservations;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>{t("reservation.title")}</h2>

        {/* Filtres */}
        <div className="filters">
          <button onClick={() => setFiltre("toutes")}>📋 {t("reservation.all")}</button>
          <button onClick={() => setFiltre("a_venir")}>📅 {t("reservation.upcoming")}</button>
          <button onClick={() => setFiltre("passees")}>🕘 {t("reservation.past")}</button>
        </div>

        {filtrerReservations().length === 0 && (
          <div className="no-reservation">
            <p>{t("reservation.none")}</p>
          </div>
        )}

        {filtrerReservations().map((reservation) => {
          const terrain = reservation?.creneauId?.terrainId ?? {};
          const date = reservation?.creneauId?.date;
          const heure = reservation?.creneauId?.heure;
          const estExpire = date && heure ? estPasse(date, heure) : true;
          const estSelectionne = creneauAModifier?._id === reservation._id;

          return (
            <div className={`reservation-card ${estExpire ? "expired" : ""}`} key={reservation._id}>
              <img
                src={`http://localhost:3000${terrain.image || ""}`}
                alt={terrain.nom || "Terrain"}
                className="terrain-image"
              />
              <div className="info-zone">
                <h3>{terrain.nom || "Terrain inconnu"}</h3>
                <p>{date} à {heure}</p>
                <span className={`badge ${estExpire ? "past" : "upcoming"}`}>
                  {estExpire ? t("reservation.past") : t("reservation.upcoming")}
                </span>
              </div>

              <div className="reservation-actions">
                {!estExpire && (
                  <>
                    <button onClick={() => handleAnnuler(reservation._id)}>{t("reservation.cancel")}</button>
                    <button onClick={() => handleModifier(reservation)}>{t("reservation.edit")}</button>
                  </>
                )}
              </div>

              {estSelectionne && (
                <div className="modification-zone">
                  <h4>{t("reservation.choose_new")}</h4>
                  <ul>
                    {creneauxDisponibles.map((c) => (
                      <li key={c._id}>
                        <button
                          onClick={() => setCreneauChoisi(c._id)}
                          className={creneauChoisi === c._id ? "selected" : ""}
                        >
                          {c.date} à {c.heure}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={confirmerModification} className="confirmer-btn">
                    {t("reservation.confirm")}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reservation;
