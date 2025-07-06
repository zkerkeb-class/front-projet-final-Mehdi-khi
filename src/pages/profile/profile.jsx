import React from 'react';
import './style.css';
import Navbar from "../../components/layout/Navbar";

const Profile = () => {
  return (
    <div className="profile-container">
      <Navbar />
      <h2>👤 Mon Profil</h2>
      <p>Cette page affichera les informations personnelles de l'utilisateur connecté.</p>
    </div>
  );
};

export default Profile;
