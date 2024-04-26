import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useTranslation } from "react-i18next";
export default function ProfileButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleClick() {
    navigate("/edit-profile");
  }

  return (
    <div onClick={handleClick} className="dropdown-button">
      <AccountCircleOutlinedIcon />
      {t("Profile")}
    </div>
  );
}
