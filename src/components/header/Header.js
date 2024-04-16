import React, { useState, useEffect } from "react";
import "./Header.css";
// import DropdownMenu from "../dropdown/DropdownMenu.js";
import icon from "../../assets/icon/output-onlinepngtools.png";
import UsersButton from "../dropdown/buttons/UsersButton.js";
import TasksButton from "../dropdown/buttons/TasksButton.js";
import CategoriesButton from "../dropdown/buttons/CategoriesButton.js";
import LogoutButton from "../dropdown/buttons/LogoutButton.js";
import ProfileButton from "../dropdown/buttons/ProfileButton.js";
import { userStore } from "../../stores/UserStore.js";
import { webSocketStore } from "../../stores/WebSocketStore.js";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const navigate = useNavigate();
  const role = userStore((state) => state.role);
  const notifications = webSocketStore((state) => state.notifications);

  // State to store the number of notifications
  const count = webSocketStore((state) => state.notifications.length);
  const username = userStore((state) => state.username);
  const userimg = userStore((state) => state.photoURL);

  const token = userStore.getState().token; // Get the token from the store
  const [user, setUser] = useState(userStore.getState()); // Get the user from the store
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

  const handleTasksDeletedClick = () => {
    navigate("/deletedtasks");
  };

  function handleClearAll() {
    webSocketStore.getState().clearNotifications();
  }

  function handleClickNotifications() {
    webSocketStore.getState().setNotificationNew([]);
  }

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
            {role === "po" ? (
              <Dropdown.Item>
                <CategoriesButton />
              </Dropdown.Item>
            ) : null}
            {role === "po" || role === "sm" ? (
              <Dropdown.Item onClick={handleTasksDeletedClick}>
                <DeleteOutlineOutlinedIcon /> Deleted Tasks
              </Dropdown.Item>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="header__right dropdown-container">
        <label className="header-name">{username}</label>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <div>
              <NotificationsNoneIcon onClick={() => handleClickNotifications} />
              {count > 0 ? <div id="notificationsCounter">{count}</div> : null}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {count > 0 ? (
              <>
                <Dropdown.Item onClick={handleClearAll} style={{ display: "flex", justifyContent: "center" }}>
                  <button type="button" className="btn btn-outline-danger" style={{ border: "none" }}>
                    Clear All
                  </button>
                </Dropdown.Item>
                {notifications.map((notification, index) => (
                  <Dropdown.Item key={index} href={`/users/${notification.sender}`}>
                    {notification.message}
                  </Dropdown.Item>
                ))}
              </>
            ) : (
              <Dropdown.Item>No Notifications to see</Dropdown.Item>
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

/* 
<SubDropdownMenu father="Delete">
            <li onClick={handleTasksDeletedClick}>Tasks</li>
            <li>Users</li>
            <li>Categories</li>
          </SubDropdownMenu>
*/
