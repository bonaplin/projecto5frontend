import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../stores/UserStore";
import GroupIcon from "@mui/icons-material/Group";
export default function UsersButton() {
  const navigate = useNavigate();
  const token = userStore.getState().token;

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
