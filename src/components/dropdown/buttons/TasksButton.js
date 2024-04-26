import React from "react";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useTranslation } from "react-i18next";

export default function TasksButton() {
  const { t } = useTranslation();
  function handleClick() {
    // console.log("TasksButton click");
    navigate("/scrum-board");
  }
  const navigate = useNavigate();

  // console.log("TasksButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <FormatListBulletedIcon />
      {t("Tasks")}
    </div>
  );
}
