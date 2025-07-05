import React from "react";
import RegisterForm from "../../components/auth/registerForm";
import "./style.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  return (
    <div className="register-page">
      <h2>{t("register.title")}</h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
