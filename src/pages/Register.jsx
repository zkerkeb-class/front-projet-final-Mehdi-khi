import React from "react";
import RegisterForm from "../components/auth/registerForm";
import "./Register.css"; // ton fichier de style pour la page register

const Register = () => {
  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
};

export default Register;
