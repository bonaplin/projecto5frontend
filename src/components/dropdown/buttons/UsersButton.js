import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
export default function UsersButton() {
  const navigate = useNavigate();

  async function handleClick() {
  
    navigate("/users");
  }
  // console.log("UsersButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <GroupIcon />
      Users
    </div>
  );
}
