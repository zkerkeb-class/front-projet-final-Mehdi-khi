import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/layout/Navbar";
import Navbar from "../components/layout/Navbar";

const CreneauxPage = () => {
  const { terrainId } = useParams();
  const [creneaux, setCreneaux] = useState([]);

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

  const reserverCreneau = async (creneauId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/creneaux/reserver/${creneauId}`, {
      method: "POST",
    });

    if (res.ok) {
      // Mise à jour locale des créneaux sans recharger
      setCreneaux(prev =>
        prev.map(c => c._id === creneauId ? { ...c, disponible: false } : c)
      );
    } else {
      console.error("Erreur de réservation");
    }
  } catch (err) {
    console.error("Erreur lors de la réservation :", err);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Créneaux pour le terrain {terrainId}</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Disponible</th>
          </tr>
        </thead>
        <tbody>
          {creneaux.map((creneau) => (
            <tr key={creneau._id}>
              <td>{creneau.date}</td>
              <td>{creneau.heure}</td>
              <td>
                {creneau.disponible ? (
                  <button onClick={() => reserverCreneau(creneau._id)}>Réserver</button>
                ) : (
                  "Réservé"
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CreneauxPage;
