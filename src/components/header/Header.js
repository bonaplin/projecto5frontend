import React, { useState, useEffect } from "react";
import "./Header.css";
import DropdownMenu from "../dropdown/DropdownMenu.js";
import icon from "../../assets/icon/output-onlinepngtools.png";
import UsersButton from "../dropdown/buttons/UsersButton.js";
import TasksButton from "../dropdown/buttons/TasksButton.js";
import CategoriesButton from "../dropdown/buttons/CategoriesButton.js";
import LogoutButton from "../dropdown/buttons/LogoutButton.js";
import ProfileButton from "../dropdown/buttons/ProfileButton.js";
import { userStore } from "../../stores/UserStore.js";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Header() {
  const navigate = useNavigate();
  const role = userStore.getState().role;
  /*dropdown main*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // console.log("Dropdown clicked", isDropdownOpen);
  };
  /*dropdown profile*/
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    // console.log("Profile Dropdown clicked", isProfileDropdownOpen);
  };

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
      const response = await fetch(
        `http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${user.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token, // Use the token from the store
          },
        }
      );
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTasksDeletedClick = () => {
    navigate("/deletedtasks");
  };

  return (
    <header className="header">
      <div className="header__left dropdown-container">
        <img
          id="logo-menu"
          onClick={handleDropdown}
          className="icon"
          src={icon}
          alt="Icon"
          draggable="false"
        />
        <DropdownMenu isOpen={isDropdownOpen} side="dropdown">
          <li>
            <TasksButton />
          </li>
          <li>
            <UsersButton />
          </li>

          {role === "po" ? (
            <li>
              <CategoriesButton />
            </li>
          ) : null}
          {role === "po" || role === "sm" ? (
            <li onClick={handleTasksDeletedClick} className="dropdown-button">
              <DeleteOutlineOutlinedIcon /> Deleted Tasks
            </li>
          ) : null}
        </DropdownMenu>
      </div>

      <div className="header__right dropdown-container">
        <label className="header-name">{userStore.getState().username}</label>
        <img
          onClick={handleProfileDropdown}
          className="profile-icon"
          src={userStore.getState().photoURL}
          alt="Profile"
        />
        <DropdownMenu isOpen={isProfileDropdownOpen} side="dropdown-right">
          <li>
            <ProfileButton />
          </li>
          <li>
            <LogoutButton />
          </li>
        </DropdownMenu>
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
