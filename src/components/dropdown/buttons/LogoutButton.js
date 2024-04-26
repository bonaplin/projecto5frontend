import React from "react";
import { userStore } from "../../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tsuccess, terror } from "../../messages/Message";
import { useTranslation } from "react-i18next";
export default function LogoutButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  async function handleClick() {
    // console.log("LogoutButton click");
    const token = userStore.getState().token;
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Clear the userStore
      await userStore.getState().updateUsername("");
      await userStore.getState().updateToken("");
      await userStore.getState().updateRole("");
      await userStore.getState().updateFirstname("");
      await userStore.getState().updateLastname("");
      await userStore.getState().updatePhotoUrl("");

      navigate("/login");
      tsuccess(data.message); // User is logged out
    } else {
      switch (response.status) {
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }

  return (
    <div onClick={handleClick} className="dropdown-button">
      <LogoutOutlinedIcon />
      {t("Logout")}
    </div>
  );
}
