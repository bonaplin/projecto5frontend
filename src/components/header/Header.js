import React, { useState, useEffect } from "react";
import "./Header.css";
// import DropdownMenu from "../dropdown/DropdownMenu.js";
import icon from "../../assets/icon/output-onlinepngtools.png";
import UsersButton from "../dropdown/buttons/UsersButton.js";
import TasksButton from "../dropdown/buttons/TasksButton.js";
import CategoriesButton from "../dropdown/buttons/CategoriesButton.js";
import LogoutButton from "../dropdown/buttons/LogoutButton.js";
import ProfileButton from "../dropdown/buttons/ProfileButton.js";
import DashboardButton from "../dropdown/buttons/DashboardButton.js";
import { userStore } from "../../stores/UserStore.js";
import { notificationStore } from "../../stores/NotificationStore.js";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MessageIcon from "@mui/icons-material/Message";
import Dropdown from "react-bootstrap/Dropdown";
import LanguageSwitcher from "../../translations/LanguageSwitcher.js";
import { useTranslation } from "react-i18next";
function Header() {
  const navigate = useNavigate();
  const role = userStore((state) => state.role);
  const username = userStore((state) => state.username);
  const userimg = userStore((state) => state.photoURL);
  const token = userStore((state) => state.token); // Get the token from the store
  const { t } = useTranslation();
  const [user, setUser] = useState(userStore.getState()); // Get the user from the store

  const notifications = notificationStore((state) => state.notifications);
  const unreadCount = notificationStore((state) => state.notificationCounter);

  useEffect(() => {
    //subscribe -> Este método é usado para registrar uma função callback que será chamada sempre que um evento específico ocorrer. No seu caso, a função callback é chamada sempre que o estado do userStore muda.
    //unsubstube -> Este método é usado para cancelar uma assinatura que foi criada anteriormente com subscribe. Ele impede que a função callback seja chamada no futuro. No seu caso, unsubscribe é chamado quando o seu componente é desmontado para evitar vazamentos de memória.
    const unsubscribe = userStore.subscribe(() => {
      setUser(userStore.getState());
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${user.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // Use the token from the store
        },
      });
      const data = await response.json();
      userStore.getState().updatePhotoUrl(data.photoURL);
      userStore.getState().updateUsername(data.username);
      userStore.getState().updateFirstname(data.firstname);
      userStore.getState().updateLastname(data.lastname);
      userStore.getState().updateEmail(data.email);
      userStore.getState().updatePhone(data.phone);
      userStore.getState().updateRole(data.role);
    }
    fetchData();
  }, [token]);

  function handleMarkAsRead(id) {
    notificationStore.getState().setNotifications(
      notifications.map((notification) => {
        if (notification.id === id) {
          notification.read = true;
        }
        return notification;
      })
    );
  }
  function handleMarkAllAsRead() {
    notificationStore.getState().setNotifications(
      notifications.map((notification) => {
        notification.read = true;
        return notification;
      })
    );
    notificationStore.getState().setNotificationCounter(0);
  }

  async function markNotificationAsRead(id) {
    let url = "http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications";
    if (id) {
      url += `?id=${id}`;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: userStore.getState().token,
        },
      });

      if (response.ok) {
        // Se a resposta for bem-sucedida, marque a notificação como lida no Zustand store
        const notificationss = notifications.map((notification) => {
          if (notification.id === id) {
            notification.read = true;
          }
          return notification;
        });

        notificationStore.getState().setNotifications(notificationss);

        if (id) {
          handleMarkAsRead(id);
        } else {
          handleMarkAllAsRead();
        }
      } else {
        // Se a resposta falhar
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("There was an error: " + error.message);
    }
  }

  const handleTasksDeletedClick = () => {
    navigate("/deletedtasks");
  };

  function handleClearAll() {
    notificationStore.getState().clearNotifications();
  }

  function handleClickNotifications() {}

  return (
    <header className="header">
      <div className="header__left dropdown-container">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <img id="logo-menu" className="icon" src={icon} alt="Icon" draggable="false" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <TasksButton />
            </Dropdown.Item>
            <Dropdown.Item>
              <UsersButton />
            </Dropdown.Item>

            {role === "po" || role === "sm" ? (
              <Dropdown.Item onClick={handleTasksDeletedClick}>
                <DeleteOutlineOutlinedIcon /> {t("Deleted Tasks")}
              </Dropdown.Item>
            ) : null}
            {role === "po" ? (
              <>
                <Dropdown.Item>
                  <CategoriesButton />
                </Dropdown.Item>
                <Dropdown.Item>
                  <DashboardButton />
                </Dropdown.Item>
              </>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="header__right dropdown-container">
        <LanguageSwitcher />
        <label className="header-role">{role}</label>
        <label className="header-name">{username}</label>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <div onClick={handleClickNotifications} style={{ cursor: "pointer" }}>
              {notifications.length > 0 ? (
                <div className="btn btn-primary position-relative">
                  <MessageIcon />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ backgroundColor: "none" }}>
                    {unreadCount}
                    <span className="visually-hidden">{t("unread messages")}</span>
                  </span>
                </div>
              ) : (
                <MessageIcon />
              )}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {notifications.length > 0 ? (
              <>
                <Dropdown.Item style={{ display: "flex", justifyContent: "center" }}>
                  <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary" style={{ padding: "0.5rem" }} onClick={() => markNotificationAsRead()}>
                      {t("Mark All as Read")}
                    </button>
                    <button type="button" className="btn btn-outline-warning" style={{ padding: "0.5rem" }} onClick={handleClearAll}>
                      {t("Clear All")}
                    </button>
                  </div>
                </Dropdown.Item>
                {notifications.length > 0 &&
                  notifications.map((notification, index) => (
                    <Dropdown.Item
                      key={index}
                      href={`/users/${notification.sender}`}
                      style={{ backgroundColor: notification.read ? "white" : "#9999" }}
                      // onClick={() => markNotificationAsRead(notification.id)}
                    >
                      {t("New message from ") +
                        notification.sender +
                        ". (" +
                        notification.time.substring(11, 16) +
                        " " +
                        notification.time.substring(8, 10) +
                        "/" +
                        notification.time.substring(5, 7) +
                        ")"}
                    </Dropdown.Item>
                  ))}
              </>
            ) : (
              <Dropdown.Item>{t("No Notifications to see")}</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img className="profile-icon" src={userimg} alt="Profile" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <ProfileButton />
            </Dropdown.Item>
            <Dropdown.Item>
              <LogoutButton />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
