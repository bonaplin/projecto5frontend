import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import "./Login.css";
import { userStore } from "../stores/UserStore";
import tcicon from "../assets/icon/tccolor.png";
import "react-notifications/lib/notifications.css";
import { tsuccess, terror, twarn } from "../components/messages/Message";
import ResetForm from "../components/formInput/ResetFormInput";
import LoginForm from "../components/formInput/LoginForm";
import { notificationStore } from "../stores/NotificationStore";
import { useTranslation } from "react-i18next";
function Login() {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  //console.log(inputs);
  const updateUsername = userStore((state) => state.updateUsername);
  const updateRole = userStore((state) => state.updateRole);
  const updateToken = userStore((state) => state.updateToken);
  const updateConfirm = userStore((state) => state.updateConfirm);
  const navigate = useNavigate();
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    //console.log("handleSubmit called");

    event.preventDefault();

    // Send a POST request to the login endpoint
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: inputs.username,
        password: inputs.password,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          updateUsername(data.username);
          updateRole(data.role);
          updateToken(data.token); // trigger create new websocket
          updateConfirm(data.confirmed);
          await getNotification();

          tsuccess(t("Login successful"));
          navigate("/scrum-board", { replace: true }); // Cant go back in browser.
        } else {
          switch (response.status) {
            case 401:
              twarn(data.message); // Login Failed
              break;
            case 403:
              twarn(data.message); // User is not active
              break;
            default:
              terror("An error occurred: " + data.message);
              break;
          }
        }
      })
      .catch((error) => {
        terror("There was an error: " + error.message);
      });
  };

  const handlePasswordReset = (event) => {
    event.preventDefault();
    console.log(inputs.email);
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/password-reset/${inputs.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          tsuccess(t("Password reset email sent"));
        }
      })
      .catch((error) => {
        console.error("There was an error: " + error.message);
      });
  };

  async function getNotification() {
    try {
      const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: userStore.getState().token,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Limpar as notificações existentes
        notificationStore.getState().setNotificationCounter(0);
        notificationStore.getState().clearNotifications();

        const unreadNotifications = data.filter((notification) => !notification.read);
        const readNotifications = data.filter((notification) => notification.read);

        notificationStore.getState().setNotifications([...unreadNotifications, ...readNotifications]);

        unreadNotifications.forEach((notification) => {
          if (!notification.read) {
            notificationStore.getState().addNotificationCounter();
          }
        });

        console.log("Notification counter: ", data.length);
        return data;
      }
    } catch (error) {
      console.error("There was an error: " + error.message);
    }
  }

  return (
    <Layout data-testid="login">
      <div className="login-outer-container">
        <div className="login-page-wrap">
          <div className="header-profile">
            <h1>{isResettingPassword ? "Reset Password" : "Login"}</h1>
            <img src={tcicon} alt="" />
          </div>
          {isResettingPassword ? (
            <ResetForm inputs={inputs} handleChange={handleChange} handlePasswordReset={handlePasswordReset} />
          ) : (
            <LoginForm inputs={inputs} handleChange={handleChange} handleSubmit={handleSubmit} />
          )}

          <div>
            <a href="#" onClick={() => setIsResettingPassword(!isResettingPassword)}>
              {isResettingPassword ? "Back to Login" : "Reset Password"}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Login;
