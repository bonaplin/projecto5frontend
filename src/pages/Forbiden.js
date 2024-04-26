import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Forbidden = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>{t("403 - Access Denied")}</h1>
      <p>{t("You need to verify your email before accessing this feature.")}</p>
      <Link to="/">{t("Back to the home page")}</Link>
    </div>
  );
};

export default Forbidden;
