import React from 'react';
import './style.css';
import Navbar from "../../components/layout/Navbar";

const Notifications = () => {
  return (
    <div className="notifications-container">
      <Navbar />
      <h2>🔔 Notifications</h2>
      <p>Ici s'afficheront les notifications liées à vos réservations et paiements.</p>
    </div>
  );
};

export default Notifications;
