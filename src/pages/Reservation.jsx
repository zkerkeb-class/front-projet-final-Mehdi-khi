import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import "./res.css";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [creneauxDisponibles, setCreneauxDisponibles] = useState([]);
  const [terrainSelectionne, setTerrainSelectionne] = useState(null);
  const [creneauAModifier, setCreneauAModifier] = useState(null);
  const [creneauChoisi, setCreneauChoisi] = useState(null);
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
    await fetch(`http://localhost:3000/api/reservations/${id}`, { method: "DELETE" });
    setReservations(reservations.filter(r => r._id !== id));
  };

  const handleModifier = async (reservation) => {
    setCreneauAModifier(reservation);
    setTerrainSelectionne(reservation.creneauId.terrainId._id);
    const res = await fetch(`http://localhost:3000/api/creneaux/${reservation.creneauId.terrainId._id}`);
    const data = await res.json();
    setCreneauxDisponibles(data);
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

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Mes Réservations</h2>

        {reservations.map((reservation) => {
          const terrain = reservation.creneauId.terrainId;
          const estExpire = estPasse(reservation.creneauId.date, reservation.creneauId.heure);

          return (
            <div className="reservation-card" key={reservation._id}>
              <img
                src={`http://localhost:3000${terrain?.image}`}
                alt={terrain.nom || "Terrain"}
                className="terrain-image"
              />
              <div className="info-zone">
                <h3>{terrain.nom}</h3>
                <p>{reservation.creneauId.date} à {reservation.creneauId.heure}</p>
                <span className={`badge ${estExpire ? "past" : "upcoming"}`}>
                  {estExpire ? "Passée" : "À venir"}
                </span>
              </div>

              <div className="reservation-actions">
                <button onClick={() => handleAnnuler(reservation._id)}>❌ Annuler</button>
                <button onClick={() => handleModifier(reservation)}>✏️ Modifier</button>
              </div>

              {creneauAModifier?._id === reservation._id && (
                <div className="modification-zone">
                  <h4>Choisir un nouveau créneau</h4>
                  <ul>
                    {creneauxDisponibles.map((c) => (
                      <li key={c._id}>
                        <button onClick={() => setCreneauChoisi(c._id)}>
                          {c.date} à {c.heure}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={confirmerModification} className="confirmer-btn">
                    ✅ Confirmer le changement
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