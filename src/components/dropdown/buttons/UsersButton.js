import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../stores/UserStore";
import GroupIcon from "@mui/icons-material/Group";
export default function UsersButton() {
  const navigate = useNavigate();
  const token = userStore.getState().token;

  async function handleClick() {
    // console.log("UsersButton click");
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    let userData = await response.json();

    // Filter the data
    userStore.getState().setUsers(userData); // Update the store
    // console.log(userData); // Log the filtered userData to the console
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
