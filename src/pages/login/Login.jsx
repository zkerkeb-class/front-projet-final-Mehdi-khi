import React from "react";
import LoginForm from "../../components/auth/loginForm";
import "./style.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="login-page">
      <h2>{t("login.title")}</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
