import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useTranslation } from "react-i18next";
export default function DashboardButton() {
  const { t } = useTranslation();
  function handleClick() {
    // console.log("CategoriesButton click");
    navigate("/dashboard");
  }
  const navigate = useNavigate();

  // console.log("CategoriesButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <DashboardIcon /> {t("Dashboard")}
    </div>
  );
}
