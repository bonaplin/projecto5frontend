import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
export default function DashboardButton() {
  function handleClick() {
    // console.log("CategoriesButton click");
    navigate("/dashboard");
  }
  const navigate = useNavigate();

  // console.log("CategoriesButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <DashboardIcon /> Dashboard
    </div>
  );
}
