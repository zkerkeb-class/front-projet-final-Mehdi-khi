import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Connexion réussie ✅");
        console.log("Connexion réussie ✅ \n User:", data.user);
        
       localStorage.setItem("token", data.token);
       navigate("/dashboard");


        
      } else {
        setMessage("Erreur : " + data.message);
      }
    } catch (err) {
      setMessage("Erreur serveur ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input
        type="email"
        name="email_x"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        name="password_x"
        autoComplete="new-password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Se connecter</button>
      <p>{message}</p>
      <p>
        Vous n’avez pas de compte ? <Link to="/register">Inscrivez-vous ici</Link>
      </p>
    </form>
  );
};

export default LoginForm;
