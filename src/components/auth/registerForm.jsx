import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Inscription réussie ✅");
        // reset les champs si tu veux
        setUserName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("Erreur : " + data.message);
      }
    } catch (err) {
      setMessage("Erreur serveur ❌");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      /><br />
      <input
        type="email"
        name="email_x"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        name="password_x"
        autoComplete="new-password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">S'inscrire</button>
      <p>{message}</p>
      <p>
        Déjà inscrit ? <Link to="/login">Connectez-vous ici</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
