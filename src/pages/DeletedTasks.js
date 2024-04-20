import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Users.css";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { userStore } from "../stores/UserStore";
import ModalYesNo from "../components/modal/ModalYesNo";
import { tsuccess, twarn, terror } from "../components/messages/Message";
import Tooltip from "@mui/material/Tooltip";

function DeletedTasks() {
  const navigate = useNavigate();
  const token = userStore.getState().token;
  const role = userStore.getState().role;
  const [deletedTasksData, setDeletedTasksData] = useState([]);
  const [taskselected, setTaskselected] = useState(null);

  const fetchInactiveTasks = async () => {
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/?active=false", {
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setDeletedTasksData(data);
    } else {
      switch (response.status) {
        case 401:
          terror(data.message); // Unauthorized
          break;
        case 403:
          terror(data.message); // Forbidden
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  };

  /* ******* ******* *********************************** *****/

  /* ******* ******* *********************************** *****/

  useEffect(() => {
    fetchInactiveTasks();
  }, []);

  /* ******* ******* *********************************** *****/

  let columns = ["id", "title", "description", "owner", "actions"];

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  function handleDelete(task) {
    setTaskselected(task);
    setIsDeleteTaskModalOpen(true);
  }
  async function handleDeleteTask() {
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${taskselected.id}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      fetchInactiveTasks();
      setIsDeleteTaskModalOpen(false);
      tsuccess("Task deleted successfully.");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Cannot delete task
          break;
        case 401:
          twarn(data.message); // Unauthorized
          break;
        case 403:
          twarn(data.message); // Forbidden
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  const [isRestoreTaskModalOpen, setIsRestoreTaskModalOpen] = useState(false);
  function handleRestore(task) {
    setTaskselected(task);
    setIsRestoreTaskModalOpen(true);
  }
  async function handleRestoreTask() {
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${taskselected.id}/restore`, {
      method: "PUT",
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      fetchInactiveTasks();
      setIsRestoreTaskModalOpen(false);
      tsuccess("Task restored successfully.");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Cannot restore task
          break;
        case 401:
          twarn(data.message); // Unauthorized
          break;
        case 403:
          twarn(data.message); // Forbidden
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  const [isDeleteAllTasksModalOpen, setIsDeleteAllTasksModalOpen] = useState(false);
  function handleDeleteAll() {
    setIsDeleteAllTasksModalOpen(true);
  }
  async function handleDeleteAllTasks() {
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/", {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      fetchInactiveTasks();
      setIsDeleteAllTasksModalOpen(false);
      tsuccess("All tasks deleted successfully.");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Cannot delete all tasks
          break;
        case 401:
          twarn(data.message); // Unauthorized
          break;
        case 403:
          twarn(data.message); // Forbidden
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  const [isRestoreAllTaskModalOpen, setIsRestoreAllTaskModalOpen] = useState(false);
  function handleRestoreAll() {
    setIsRestoreAllTaskModalOpen(true);
  }
  async function handleRestoreAllTask() {
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/restore", {
      method: "PUT",
      headers: {
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      fetchInactiveTasks();
      setIsRestoreAllTaskModalOpen(false);
      tsuccess("All tasks restored successfully.");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Cannot restore all tasks
          break;
        case 401:
          twarn(data.message); // Unauthorized
          break;
        case 403:
          twarn(data.message); // Forbidden
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }

  return (
    <>
      <Header />
      {(role === "po" || role === "sm") && (
        <div className="Home users">
          <div className="page-wrap">
            <h2>Deleted Tasks List</h2>
            {role === "po" && (
              <div className="top-buttons">
                <div>
                  <Tooltip title="Delete All Tasks">
                    <DeleteForeverIcon onClick={handleDeleteAll} className="add-some" fontSize="large" />
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Restore All Tasks">
                    <RestoreFromTrashIcon onClick={handleRestoreAll} className="restore-some" fontSize="large" />
                  </Tooltip>
                </div>
              </div>
            )}
            {isDeleteAllTasksModalOpen && (
              <ModalYesNo
                title="Delete All Tasks"
                message="Are you sure you want to delete all tasks?"
                open={isDeleteAllTasksModalOpen}
                onClose={() => setIsDeleteAllTasksModalOpen(false)}
                onYes={handleDeleteAllTasks}
                onNo={() => setIsDeleteAllTasksModalOpen(false)}
              />
            )}
            {isRestoreAllTaskModalOpen && (
              <ModalYesNo
                title="Restore All Tasks"
                message="Are you sure you want to restore all tasks?"
                open={isRestoreAllTaskModalOpen}
                onClose={() => setIsRestoreAllTaskModalOpen(false)}
                onYes={handleRestoreAllTask}
                onNo={() => setIsRestoreAllTaskModalOpen(false)}
              />
            )}
            {isDeleteTaskModalOpen && (
              <ModalYesNo
                title="Delete Task"
                message="Are you sure you want to delete this task?"
                open={isDeleteTaskModalOpen}
                onClose={() => setIsDeleteTaskModalOpen(false)}
                onYes={handleDeleteTask}
                onNo={() => setIsDeleteTaskModalOpen(false)}
              />
            )}
            {isRestoreTaskModalOpen && (
              <ModalYesNo
                title="Restore Task"
                message="Are you sure you want to Restore this task?"
                open={isRestoreTaskModalOpen}
                onClose={() => setIsRestoreTaskModalOpen(false)}
                onYes={handleRestoreTask}
                onNo={() => setIsRestoreTaskModalOpen(false)}
              />
            )}

            <Table class="table" type="deleted_tasks" data={deletedTasksData} columns={columns} handleDelete={handleDelete} handleEdit={handleRestore} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
export default DeletedTasks;
