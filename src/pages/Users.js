import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import "./Users.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { userStore } from "../stores/UserStore";
import UserModal from "../components/modal/UserModal";
import { tsuccess, terror, twarn } from "../components/messages/Message";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Users() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false); //to change the fetch
  const role = userStore.getState().role;
  const token = userStore.getState().token;
  // User selected
  const [editUser, setEditUser] = useState(null);
  // const [userData, setUserData] = useState([]);

  const { users, setUsers } = userStore((state) => state);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/", {
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setUsers(data);
      userStore.getState().setUsers(data);
      // tsuccess("Users fetched successfully");
    } else {
      switch (response.status) {
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          // twarn("An error occurred: " + data.message);
          break;
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [isChange]); // Add dependencies here if any

  /* ******* ******* ADD USER BUTTON  ***************** *****/
  const [isModalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleAddUserButton = () => {
    setModalOpen(true);
  };
  async function handleCreateUser(user) {
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
        role: role,
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      // console.log("User Created");
      setModalOpen(false);
      setIsChange(!isChange);
      tsuccess("User Created");
    }

    if (!response.ok) {
      terror("User not created. Please try again.");
    }

    let userDetails = await response.json();
    //console.log("User Created", userDetails);
  }
  // Modal -> EDIT /* ******* ******* *********************************** *****/
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };
  async function handleUpdateUser(user) {
    // let useru = { ...user };
    // delete useru.password;

    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (response.ok) {
      tsuccess("User Updated");
      setIsEditModalOpen(false);
      setIsChange(!isChange);
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid format error
          break;
        case 409:
          twarn(data.message); // Username or email already exists error
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  /* ******* ******* *********************************** *****/
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = (user) => {
    setEditUser(user);
    setIsDeleteModalOpen(true);
    console.dir(user);
  };
  async function handleDeleteUser(user) {
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const data = await response.json();

    if (response.ok) {
      //console.log("User Deleted");
      setIsChange(!isChange);
      setIsDeleteModalOpen(false);
      tsuccess("User deleted successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid format error
          break;
        case 409:
          twarn(data.message); // Username or email already exists error
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }

    //console.log("User Deleted", data);
  }

  /* ******* ******* *********************************** *****/
  const [isDeleteTasksModalOpen, setIsDeleteModalTasksOpen] = useState(false);
  const handleDeleteTasks = (user) => {
    setEditUser(user);
    setIsDeleteModalTasksOpen(true);
    console.dir(user);
  };
  async function handleDeleteTasksUser(user) {
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${user.username}/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      //console.log("User Tasks Deleted");
      setIsChange(!isChange);
      setIsDeleteModalTasksOpen(false);
      tsuccess("User tasks deleted successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Tasks not deleted or Invalid Parameters error
          break;
        case 401:
          twarn(data.message); // Unauthorized error
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }

    //console.log("User Tasks Deleted", data);
  }

  /* ******* ******* *********************************** *****/

  const handleActiveChange = (user) => {
    const newUser = { ...user, active: !user.active };
    console.dir("user :" + user + "newUser :" + newUser);
    handleUpdateUserActive(newUser);
  };

  async function handleUpdateUserActive(user) {
    const body = {
      username: user.username,
      active: user.active,
    };
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${user.username}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      //console.log("User Active Updated");
      setIsChange(!isChange);
      tsuccess("User active status updated successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Status not changed or Invalid Parameters error
          break;
        case 401:
          twarn(data.message); // Unauthorized error
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }

    //console.log("User Active Edited", data);
  }
  /* ******* ******* *********************************** *****/
  let columnMapping = {
    photoURL: t("photoURL"),
    username: t("username"),
    firstname: t("firstname"),
    lastname: t("lastname"),
    email: t("Email"),
    phone: t("phone"),
    role: t("role"),
    active: t("active"),
    actions: t("actions"),
  };
  let columns = ["photoURL", "username", "firstname", "lastname", "email", "phone", "role", "active", "actions"];

  if (role === "sm" || role === "dev") {
    // Filter the userData array to exclude inactive users
    users.filter((user) => user.active);
    // Find the index of the "actions" column
    const actionsIndex = columns.indexOf("actions");
    // If the "actions" column exists, remove it
    if (actionsIndex !== -1) {
      columns.splice(actionsIndex, 1);
    }
    // Find the index of the "active" column
    const activeIndex = columns.indexOf("active");
    // If the "active" column exists, remove it
    if (activeIndex !== -1) {
      columns.splice(activeIndex, 1);
    }
  } else if (role === "po") {
    // Perform your operations for the "po" role here
  } else {
    columns = [""];
  }

  function handleUserClick(id, username) {
    // alert("User clicked: " + user.username);

    navigate(`/users/${username}`);
  }
  const createUser = t("Create User");
  const editUsers = t("Edit User");
  const deleteUser = t("Delete User");
  const deleteTasks = t("Delete Tasks");
  const deleteUserTasks = t("Delete User Tasks");

  return (
    <>
      <Header />
      <div className="Home users">
        <div className="page-wrap">
          <h2>{t("All Users")}</h2>
          {role === "po" && (
            <>
              <Tooltip title={t("Add User")}>
                <AddCircleIcon className="add-some" onClick={handleAddUserButton} fontSize="large" />
              </Tooltip>

              <UserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateUser}
                title={createUser}
                user={{}} // Pass an empty user object to the UserModal
              />
            </>
          )}
          {isEditModalOpen && (
            <UserModal
              open={isEditModalOpen}
              title={editUsers}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleUpdateUser} // You need to define this function to handle the user update
              user={editUser}
            />
          )}
          {isDeleteModalOpen && (
            <UserModal
              open={isDeleteModalOpen}
              title={deleteUser}
              onClose={() => setIsDeleteModalOpen(false)}
              onSubmit={handleDeleteUser}
              user={editUser}
            />
          )}
          {isDeleteTasksModalOpen && (
            <UserModal
              open={isDeleteTasksModalOpen}
              title={deleteUserTasks}
              onClose={() => setIsDeleteModalTasksOpen(false)}
              onSubmit={handleDeleteTasksUser}
              user={editUser}
            />
          )}
          <Table
            class="table"
            data={users}
            type="user"
            columns={columns}
            columnMapping={columnMapping}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDeleteTasks={handleDeleteTasks}
            handleActiveChange={handleActiveChange}
            handleUserClick={handleUserClick}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Users;
/*<Table data={userData} />*/
/*<Table class="table" data={userData} />*/
