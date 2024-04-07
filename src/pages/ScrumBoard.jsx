import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import { categoriesStore } from "../stores/CategoriesStore";
import "./ScrumBoard.css";
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

export default function ScrumBoard() {
  const token = userStore.getState().token;
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const role = userStore.getState().role;
  const [isChanged, setIsChanged] = useState(false);
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const navigate = useNavigate();
  const [usernameDD, setUsername] = useState(null);
  const [categoryDD, setCategory] = useState(null);

  async function updateStatus(id, newStatus) {
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${id}/status/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      //console.log("resposta" + response.status);
      //console.log("Task updated successfully");
      // tsuccess("Task updated successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message);
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  }
  function handleAddClick() {
    setIsAddTaskModal(true);
  }
  async function AddTask(task) {
    console.log("task", task);
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(task),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setIsAddTaskModal(false);
      setIsChanged(!isChanged);
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
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(task),
      }
    );

    const data = await response.json();

    if (response.ok) {
      //console.log("Task updated successfully");
      setIsEditModalOpen(false);
      setIsChanged(!isChanged);
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
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/${task.id}/desactivate`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      //console.log("Task deleted successfully");
      setIsDeleteModalOpen(false);
      setIsChanged(!isChanged);
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
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/get?id=${task.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
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
          const todo = data.filter((task) => task.status === 100);
          const doing = data.filter((task) => task.status === 200);
          const done = data.filter((task) => task.status === 300);

          setTodo(todo);
          setDoing(doing);
          setDone(done);
        } else {
          terror("Failed to fetch tasks");
          //console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        terror("Failed to fetch tasks");
      }
    }
    fetchTasks();
  }, [usernameDD, categoryDD, isChanged]);

  const [users, setUsers] = useState([]);

  // Fetch users --------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/",
        {
          headers: {
            token: token,
          },
        }
      );
      if (!response.ok) {
        terror("Failed to fetch users:", response.statusText);
        return;
      }
      const users = await response.json();
      const userNames = users.map((user) => user.username);
      setUsers(userNames);
    }
    fetchUsers();
  }, [userStore.getState().users]);

  // Fetch categories -----------------------

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/",
        {
          headers: {
            token: token,
          },
        }
      );
      if (!response.ok) {
        terror("Failed to fetch categories:", response.statusText);
        if (response.status === 403) {
          terror("You don't have permission");
        }
        return;
      }
      const categories = await response.json();
      const categoriesNames = categories.map((category) => category.title);
      setCategories(categoriesNames);
      console.log("ver");
    }
    fetchCategories();
  }, [categoriesStore.getState().categories]);
  //------------------------------------------------------------------------dnd beautiful

  function removeItemById(array, id) {
    return array.filter((item) => String(item.id) !== id);
  }
  function findItemById(array, id) {
    return array.find((item) => String(item.id) === id);
  }
  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { destination, source, draggableId } = result;

    // Create new arrays for the tasks
    let newTodo = [...todo];
    let newDoing = [...doing];
    let newDone = [...done];
    // Find the task and remove it from its source column
    const allTasks = [...newTodo, ...newDoing, ...newDone];
    const task = findItemById(allTasks, draggableId);

    // Remove the task from the source column
    if (source.droppableId === "100") {
      newTodo = removeItemById(newTodo, draggableId);
    } else if (source.droppableId === "200") {
      newDoing = removeItemById(newDoing, draggableId);
    } else if (source.droppableId === "300") {
      newDone = removeItemById(newDone, draggableId);
    }

    // Add the task to the destination column depending on the droppableId
    if (destination.droppableId === "100") {
      task.todo = true;
      task.doing = false;
      task.done = false;
      task.status = 100;
      newTodo.splice(destination.index, 0, task);
      updateStatus(result.draggableId, 100);
    } else if (destination.droppableId === "200") {
      task.todo = false;
      task.done = true;
      task.doing = false;
      task.status = 200;
      newDoing.splice(destination.index, 0, task);
      updateStatus(result.draggableId, 200);
    } else if (destination.droppableId === "300") {
      task.done = false;
      task.todo = false;
      task.doing = true;
      newDone.splice(destination.index, 0, task);
      task.status = 300;
      updateStatus(result.draggableId, 300);
    }

    // Update the state once with the new arrays
    setSelectedTask(task);
    setTodo(newTodo);
    setDoing(newDoing);
    setDone(newDone);
  }
  //------------------------------------------------------------------------dnd beautiful

  function handleCloseAddModal() {
    setIsAddTaskModal(false);
    setSelectedTask({});
  }

  function handleClickMyTasks() {
    setUsername(userStore.getState().username);
  }
  function handleResetFilter() {
    setUsername("");
    setCategory("");
  }

  return (
    <>
      <Header />
      <div className="Home">
        <div className="page-wrap">
          <h2>Tasks</h2>
          <div>
            <Tooltip title="Add task">
              <AddCircleIcon
                onClick={handleAddClick}
                className="add-some"
                fontSize="large"
              />
            </Tooltip>
            <Tooltip title="My Tasks">
              <FilterAltIcon
                onClick={handleClickMyTasks}
                className="restore-button"
                fontSize="large"
              />
            </Tooltip>
            <Tooltip title="Reset Filter / Order">
              <RestoreIcon
                className="restore-button"
                onClick={handleResetFilter}
                fontSize="large"
              />
            </Tooltip>
            {(role === "sm" || role === "po") && (
              <div className="filter-container">
                <div className="filter-side">
                  <Dropdown
                    className="filter-dropdown"
                    value={usernameDD}
                    data={users}
                    type={"Username"}
                    onChange={(selectedValue) => setUsername(selectedValue)}
                  />
                  <Dropdown
                    className="filter-dropdown"
                    value={categoryDD}
                    data={categories}
                    type={"Category"}
                    onChange={(selectedValue) => setCategory(selectedValue)}
                  />
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
          {
            <TaskModal
              open={isAddTaskModal}
              title_modal="Add task"
              onClose={handleCloseAddModal}
              onSubmit={AddTask}
              task={selectedTask}
            />
          }
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="scrum-board">
              <Column
                title={"TO DO"}
                tasks={todo}
                id={"100"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
              />
              <Column
                title={"DOING"}
                tasks={doing}
                id={"200"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
              />
              <Column
                title={"DONE"}
                tasks={done}
                id={"300"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
              />{" "}
            </div>{" "}
          </DragDropContext>
        </div>
        <Footer />
      </div>
    </>
  );
}
