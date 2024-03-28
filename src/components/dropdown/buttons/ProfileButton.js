import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function ProfileButton() {
  const navigate = useNavigate();

  async function handleClick() {
    navigate("/edit-profile");
  }

  return (
    <div onClick={handleClick} className="dropdown-button">
      <AccountCircleOutlinedIcon />
      Profile
    </div>
  );
}
