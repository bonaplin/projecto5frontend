import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import { categoriesStore } from "../stores/CategoriesStore";
// import { taskStore } from "../stores/TaskStore";
import { useTaskStore } from "../stores/useTaskStore.js";

import "./ScrumBoard.css";
import "../App.css";
import { tsuccess, twarn, terror } from "../components/messages/Message";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/scrum-board/Column";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestoreIcon from "@mui/icons-material/Restore";
import TaskModal from "../components/modal/TaskModal.js";
import ModalYesNo from "../components/modal/ModalYesNo.js";
import TaskViewModal from "../components/modal/TaskViewModal.js";
import Dropdown from "../components/dropdown/Dropdown.js";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Tooltip from "@mui/material/Tooltip";
import { webSocketStore } from "../stores/WebSocketStore.js";
import MessageType from "../components/websockets/MessageType.js";

export default function ScrumBoard() {
  // const { clearDD, addTask, removeTask, updateTask, setUsernameDD, usernameDD, setCategoryDD, categoryDD } = taskStore((state) => state);
  const { allTasks, usernameDD, setUsernameDD, categoryDD, setCategoryDD, clearDD } = useTaskStore((state) => state);
  const { categories, setCategories, categoriesNames, setCategoriesNames } = categoriesStore((state) => state);
  const { users, userNames } = userStore((state) => state);
  const { token, role } = userStore((state) => state);
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const { send } = webSocketStore();

  function handleAddClick() {
    setIsAddTaskModal(true);
  }
  async function AddTask(task) {
    // task.owner = userStore.getState().username;
    console.log("task enviada para o backend", task);
    const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(task);
      setIsAddTaskModal(false);

      tsuccess("Task added successfully");
      return { success: true }; // Return success to close the modal/update the tasks/clean inputs
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid task or Cannot add task
          break;
        case 401:
          twarn(data.message); // Unauthorizeds
          break;
        default:
          terror("An error occurred: " + data.message);
      }
      return { success: false }; // Return failure
    }
  }

  // Task buttons -------------------------------------------------------------- BUTTONS
  //EDIT
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };
  async function handleEditTask(task) {
    //console.log("task", task);
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (response.ok) {
      //console.log("Task updated successfully");
      setIsEditModalOpen(false);
      // setIsChanged(!isChanged);
      tsuccess("Task updated successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid task
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
  //DELETE
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };
  async function handleDeleteTask(task) {
    //console.log("task", task);
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${task.id}/desactivate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      //console.log("Task deleted successfully");
      setIsDeleteModalOpen(false);
      // setIsChanged(!isChanged);
      tsuccess("Task deleted successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Cannot desactivate task
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
  //VIEW
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const handleView = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  async function handleViewTask(task) {
    //console.log("task", task);
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/get?id=${task.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => {
        //console.log(response.status);
        if (response.ok) {
          setIsViewModalOpen(false);
          //setIsChanged(!isChanged);
        } else {
          console.error("Failed to view task:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to view task:", error);
      });
  }
  // ---------------------------------------------------------------------------- BUTTONS

  useEffect(() => {
    async function fetchTasks() {
      let url = "http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/";

      if (usernameDD !== null && categoryDD !== null) {
        url += `?username=${usernameDD}&category=${categoryDD}`;
      } else if (usernameDD !== null) {
        url += `?username=${usernameDD}`;
      } else if (categoryDD !== null) {
        url += `?category=${categoryDD}`;
      }
      try {
        const response = await fetch(url, {
          headers: {
            token: token,
          },
        });
        //console.log(response.status);
        if (response.ok) {
          const data = await response.json();

          useTaskStore.getState().setAllTasks(data.todoTasks.concat(data.doingTasks, data.doneTasks));
          console.log("tasks", allTasks);
        } else {
          terror("Failed to fetch tasks");
          console.log(response.statusText);
        }
      } catch (error) {
        terror("Failed to fetch tasks");
        console.error(error);
      }
    }
    fetchTasks();
  }, [usernameDD, categoryDD]);

  // Fetch users --------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/", {
        headers: {
          token: token,
        },
      });
      if (!response.ok) {
        terror("Failed to fetch users:", response.statusText);
        return;
      }
      const data = await response.json();
      const userNames = data.map((user) => user.username);
      userStore.getState().setUsers(users);
      userStore.getState().setUsernames(userNames);
      // console.log("users", users);
      console.log("usernames", userNames);
    }
    fetchUsers();
  }, []);

  // Fetch categories -----------------------

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/", {
        headers: {
          token: token,
        },
      });
      if (!response.ok) {
        terror("Failed to fetch categories:", response.statusText);
        if (response.status === 403) {
          terror("You don't have permission");
        }
        return;
      }
      const categories = await response.json();
      const categoriesNames = categories.map((category) => category.title);
      setCategoriesNames(categoriesNames);
      // console.log("ver");
    }
    fetchCategories();
  }, []);
  //------------------------------------------------------------------------dnd beautiful

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { destination, source, draggableId } = result;

    let newStatus;
    if (destination.droppableId === "100") {
      newStatus = 100;
      console.log(destination.index);
    } else if (destination.droppableId === "200") {
      newStatus = 200;
      console.log(destination.index);
    } else if (destination.droppableId === "300") {
      newStatus = 300;
      console.log(destination.index);
    }

    const id = parseInt(draggableId);
    send(JSON.stringify({ type: MessageType.TASK_MOVE, id: id, status: newStatus, index: destination.index }));
  }
  //------------------------------------------------------------------------dnd beautiful

  function handleCloseAddModal() {
    setIsAddTaskModal(false);
    setSelectedTask({});
  }

  function handleClickMyTasks() {
    setUsernameDD(usernameDD === userStore.getState().username ? "" : userStore.getState().username);
  }
  function handleResetFilter() {
    clearDD();
  }

  const todo = allTasks.filter((task) => task.status === 100 && task.active === true);
  const doing = allTasks.filter((task) => task.status === 200 && task.active === true);
  const done = allTasks.filter((task) => task.status === 300 && task.active === true);

  return (
    <>
      <Header />
      <div className="Home">
        <div className="page-wrap">
          <h2>Tasks</h2>
          <div>
            <Tooltip title="Add task">
              <AddCircleIcon onClick={handleAddClick} className="add-some" fontSize="large" />
            </Tooltip>
            <Tooltip title="My Tasks">
              <FilterAltIcon onClick={handleClickMyTasks} className="restore-button" fontSize="large" />
            </Tooltip>
            <Tooltip title="Reset Filter / Order">
              <RestoreIcon className="restore-button" onClick={handleResetFilter} fontSize="large" />
            </Tooltip>
            {(role === "sm" || role === "po") && (
              <div className="filter-container">
                <div className="filter-side">
                  <Dropdown className="filter-dropdown" value={usernameDD} data={userNames} type={"Username"} onChange={(e) => setUsernameDD(e)} />
                  <Dropdown className="filter-dropdown" value={categoryDD} data={categoriesNames} type={"Category"} onChange={(e) => setCategoryDD(e)} />
                </div>
              </div>
            )}
          </div>
          {isDeleteModalOpen && (
            <ModalYesNo
              open={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title={"Delete task"}
              message={"Are you sure you want to delete this task?"}
              onYes={() => {
                setIsDeleteModalOpen(false);
                handleDeleteTask(selectedTask);
              }}
              onNo={() => setIsDeleteModalOpen(false)}
            />
          )}
          {isEditModalOpen && (
            <TaskModal
              open={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              title_modal="Edit task"
              onSubmit={handleEditTask}
              task={selectedTask}
            />
          )}
          {isViewModalOpen && (
            <TaskViewModal
              open={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
              title_modal="View task"
              onSubmit={handleViewTask}
              task={selectedTask}
            />
          )}
          {<TaskModal open={isAddTaskModal} title_modal="Add task" onClose={handleCloseAddModal} onSubmit={AddTask} task={selectedTask} />}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="scrum-board container">
              <div className="row">
                <div className="todo col-lg-4 col-md-6 my-2">
                  <Column title={"TO DO"} tasks={todo} id={"100"} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
                </div>
                <div className="doing col-lg-4 col-md-6 my-2">
                  <Column title={"DOING"} tasks={doing} id={"200"} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
                </div>
                <div className="done col-lg-4 col-md-6 my-2">
                  <Column title={"DONE"} tasks={done} id={"300"} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />{" "}
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
        <Footer />
      </div>
    </>
  );
}
