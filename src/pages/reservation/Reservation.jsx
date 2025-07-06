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
  const [filtre, setFiltre] = useState("toutes");
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
    const maintenant = new Date();
    const creneauxFiltres = data.filter(c =>
      c.disponible &&
      new Date(`${c.date}T${c.heure}`) > maintenant
    );
    setCreneauxDisponibles(creneauxFiltres);
  };

  const confirmerModification = async () => {
    const confirmer = window.confirm(t("reservation.confirm_change"));
    if (!confirmer) return;
    if (!creneauChoisi || !creneauAModifier) return;
    try {
      await fetch(`http://localhost:3000/api/reservations/${creneauAModifier._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nouveauCreneauId: creneauChoisi }),
      });
      window.location.reload();
    } catch (err) {
      console.error("Erreur modification créneau :", err);
    }
  };

  const estPasse = (date, heure) => {
    const now = new Date();
    const d = new Date(`${date}T${heure}`);
    return d < now;
  };

  const filtrerReservations = () => {
    const valides = reservations.filter(r =>
      r?.creneauId?.terrainId && r?.creneauId?.date && r?.creneauId?.heure
    );
    if (filtre === "passees") {
      return valides.filter(r => estPasse(r.creneauId.date, r.creneauId.heure));
    } else if (filtre === "a_venir") {
      return valides.filter(r => !estPasse(r.creneauId.date, r.creneauId.heure));
    }
    return valides;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>{t("reservation.title")}</h2>

        <div className="filters">
          <button
            onClick={() => setFiltre("toutes")}
            className={`btn-secondary ${filtre === "toutes" ? "active" : ""}`}
          >
            📋 {t("reservation.all")}
          </button>
          <button
            onClick={() => setFiltre("a_venir")}
            className={`btn-secondary ${filtre === "a_venir" ? "active" : ""}`}
          >
            📅 {t("reservation.upcoming")}
          </button>
          <button
            onClick={() => setFiltre("passees")}
            className={`btn-secondary ${filtre === "passees" ? "active" : ""}`}
          >
            🕘 {t("reservation.past")}
          </button>
        </div>

        {filtrerReservations().length === 0 && (
          <div className="no-reservation">
            <p>{t("reservation.none")}</p>
          </div>
        )}

        {filtrerReservations().map((reservation) => {
          const terrain = reservation.creneauId.terrainId;
          const date = reservation.creneauId.date;
          const heure = reservation.creneauId.heure;
          const estExpire = estPasse(date, heure);
          const estSelectionne = creneauAModifier?._id === reservation._id;

          return (
            <div className={`reservation-card ${estExpire ? "expired" : ""}`} key={reservation._id}>
              <img
                src={`http://localhost:3000${terrain.image || ""}`}
                alt={terrain.nom || "Terrain"}
                className="terrain-image"
              />
              <div className="info-zone">
                <h3>{terrain.nom}</h3>
                <p>{date} à {heure}</p>
                <span className={`badge ${estExpire ? "past" : "upcoming"}`}>
                  {estExpire ? t("reservation.past") : t("reservation.upcoming")}
                </span>
              </div>

              {!estExpire && (
                <div className="reservation-actions">
                  <button className="btn" onClick={() => handleAnnuler(reservation._id)}>
                    {t("reservation.cancel")}
                  </button>
                  <button className="btn" onClick={() => handleModifier(reservation)}>
                    {t("reservation.edit")}
                  </button>
                </div>
              )}

              {estSelectionne && (
                <div className="modification-zone">
                  <h4>{t("reservation.choose_new")}</h4>
                  <ul>
                    {creneauxDisponibles.map((c) => (
                      <li key={c._id}>
                        <button
                          className={`btn-secondary ${creneauChoisi === c._id ? "active" : ""}`}
                          onClick={() => setCreneauChoisi(c._id)}
                        >
                          {c.date} à {c.heure}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-confirm" onClick={confirmerModification}>
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
