import React from "react";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
export default function TasksButton() {
  function handleClick() {
    // console.log("TasksButton click");
    navigate("/scrum-board");
  }
  const navigate = useNavigate();

  // console.log("TasksButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <FormatListBulletedIcon />
      Tasks
    </div>
  );
}
