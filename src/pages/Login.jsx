import React from "react";
import LoginForm from "../components/auth/loginForm";
import "./Login.css"; // ton fichier de style pour la page login

const Login = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default Login;
