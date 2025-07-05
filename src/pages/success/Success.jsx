import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./style.css";

const Success = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const query = new URLSearchParams(location.search);
  const creneauId = query.get("creneauId");

  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const confirmReservation = async () => {
      if (!userId || !creneauId) {
        console.error("userId ou creneauId manquant");
        setError(true);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, creneauId }),
        });

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setDetails(data);
        setConfirmation(true);
      } catch (err) {
        console.error("Erreur lors de la confirmation:", err);
        setError(true);
      }
    };

    confirmReservation();
  }, [userId, creneauId]);

  return (
    <>
      <Navbar />
      <div className="success-container">
        <div className="success-box">
          <div className="icon-box">
            {confirmation ? (
              <span className="icon success">✅</span>
            ) : (
              <span className="icon error">❌</span>
            )}
          </div>

          <h2>
            {confirmation
              ? t("success.title_success")
              : t("success.title_error")}
          </h2>

          {details && (
            <div className="resume">
              <p><strong>{t("success.field_terrain")}</strong> {details.terrain?.nom}</p>
              <p><strong>{t("success.field_date")}</strong> {details.date}</p>
              <p><strong>{t("success.field_time")}</strong> {details.heure}</p>
              <p><strong>{t("success.field_price")}</strong> {details.terrain?.prix} €</p>
            </div>
          )}

          <div className="success-actions">
            <button onClick={() => navigate("/dashboard")}>{t("success.home")}</button>
            <button onClick={() => navigate("/mes-reservations")}>{t("success.my_reservations")}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
