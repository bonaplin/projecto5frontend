import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useTranslation } from "react-i18next";
export default function CategoriesButton() {
  const { t } = useTranslation();
  function handleClick() {
    // console.log("CategoriesButton click");
    navigate("/categories");
  }
  const navigate = useNavigate();

  // console.log("CategoriesButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <CategoryOutlinedIcon /> {t("Categories")}
    </div>
  );
}
