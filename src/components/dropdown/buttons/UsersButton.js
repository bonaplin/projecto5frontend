import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import { useTranslation } from "react-i18next";
export default function UsersButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  async function handleClick() {
    navigate("/users");
  }
  // console.log("UsersButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <GroupIcon />
      {t("Users")}
    </div>
  );
}
