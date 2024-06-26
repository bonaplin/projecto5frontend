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
// import { taskStore } from "../stores/TaskStore";
import { useTaskStore } from "../stores/useTaskStore";
import ModalYesNo from "../components/modal/ModalYesNo";
import { tsuccess, twarn, terror } from "../components/messages/Message";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
function DeletedTasks() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { role, token } = userStore((state) => state);
  const [taskselected, setTaskselected] = useState(null);
  const { addTasks } = useTaskStore();
  const allTasks = useTaskStore((state) => state.allTasks);

  useEffect(() => {
    const fetchInactiveTasks = async () => {
      const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/?active=false", {
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        addTasks(data);
        // console.log(allTasks);
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
    fetchInactiveTasks();
  }, []);
  const deleted = allTasks.filter((task) => task.active === false);
  let columns = ["id", "title", "description", "owner", "actions"];
  let columnMapping = {
    id: t("ID"),
    title: t("Title"),
    description: t("Description"),
    owner: t("Owner"),
    actions: t("Actions"),
  };

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
      // fetchInactiveTasks();
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
      // fetchInactiveTasks();
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
      // fetchInactiveTasks();
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
      // fetchInactiveTasks();
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
  const deleteAllTasks = t("Delete All Tasks");
  const restoreAllTasks = t("Restore All Tasks");
  const deleteTask = t("Delete Task");
  const restoreTask = t("Restore Task");

  return (
    <>
      {/* <Header /> */}
      {(role === "po" || role === "sm") && (
        <div className="Home users">
          <div className="page-wrap">
            <h2>{t("Deleted Tasks List")}</h2>
            {role === "po" && (
              <div className="top-buttons">
                <div>
                  <Tooltip title={deleteAllTasks}>
                    <DeleteForeverIcon onClick={handleDeleteAll} className="add-some" fontSize="large" />
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title={restoreAllTasks}>
                    <RestoreFromTrashIcon onClick={handleRestoreAll} className="restore-some" fontSize="large" />
                  </Tooltip>
                </div>
              </div>
            )}
            {isDeleteAllTasksModalOpen && (
              <ModalYesNo
                title={deleteAllTasks}
                open={isDeleteAllTasksModalOpen}
                onClose={() => setIsDeleteAllTasksModalOpen(false)}
                onYes={handleDeleteAllTasks}
                onNo={() => setIsDeleteAllTasksModalOpen(false)}
              />
            )}
            {isRestoreAllTaskModalOpen && (
              <ModalYesNo
                title={restoreAllTasks}
                message={t("Are you sure you want to restore all tasks?")}
                open={isRestoreAllTaskModalOpen}
                onClose={() => setIsRestoreAllTaskModalOpen(false)}
                onYes={handleRestoreAllTask}
                onNo={() => setIsRestoreAllTaskModalOpen(false)}
              />
            )}
            {isDeleteTaskModalOpen && (
              <ModalYesNo
                title={deleteTask}
                message={t("Are you sure you want to delete this task?")}
                open={isDeleteTaskModalOpen}
                onClose={() => setIsDeleteTaskModalOpen(false)}
                onYes={handleDeleteTask}
                onNo={() => setIsDeleteTaskModalOpen(false)}
              />
            )}
            {isRestoreTaskModalOpen && (
              <ModalYesNo
                title={restoreTask}
                message={t("Are you sure you want to Restore this task?")}
                open={isRestoreTaskModalOpen}
                onClose={() => setIsRestoreTaskModalOpen(false)}
                onYes={handleRestoreTask}
                onNo={() => setIsRestoreTaskModalOpen(false)}
              />
            )}

            <Table
              class="table"
              type="deleted_tasks"
              data={deleted}
              columns={columns}
              columnMapping={columnMapping}
              handleDelete={handleDelete}
              handleEdit={handleRestore}
            />
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
}
export default DeletedTasks;
