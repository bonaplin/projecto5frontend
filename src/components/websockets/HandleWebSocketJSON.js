import { webSocketStore } from "../../stores/WebSocketStore";
import { notificationStore } from "../../stores/NotificationStore";
import { userStore } from "../../stores/UserStore";
// import { taskStore } from "../../stores/TaskStore";
import { useTaskStore } from "../../stores/useTaskStore";
import { statisticsStore } from "../../stores/Statistics";
import { tsuccess, twarn, tinfo, tdefault } from "../messages/Message";
import MessageType from "./MessageType";
import { South } from "@mui/icons-material";

function handleWebSocketJSON(json) {
  let data;
  const statistics = statisticsStore.getState();
  const notifications = notificationStore.getState();
  // const tasks = taskStore.getState();
  const allTasks = useTaskStore.getState();
  const users = userStore.getState();
  const websockets = webSocketStore.getState();
  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON", json);
    return;
  }

  switch (data.type) {
    case MessageType.MESSAGE_SENDER:
      handleMessage(data);
      break;

    case MessageType.MESSAGE_RECEIVER:
      handleMessageSender(data);
      break;

    case MessageType.MESSAGE_READ:
      handleMessageRead();
      break;

    case MessageType.MESSAGE_READ_CONFIRMATION:
      handleMessageMarkAsRead(data);
      break;

    case MessageType.TYPE_20:
      break;

    case MessageType.TASK_CREATE:
      handleNewTask(data);
      break;

    case MessageType.TASK_MOVE:
      handleMoveTask(data);
      break;

    case MessageType.TASK_EDIT:
      handleEditTask(data);
      break;

    case MessageType.TASK_EDIT_AND_MOVE:
      handleMoveTask(data);
      break;

    case MessageType.TASK_DESACTIVATE:
      handleDesactivateTask(data);
      break;

    case MessageType.TASK_DELETE:
      handleDeleteTask(data);
      break;

    case MessageType.TASK_RESTORE:
      handleRestoreTask(data);
      break;

    case MessageType.TASK_RESTORE_ALL:
      handleRestoreAllTask(data);
      break;

    case MessageType.TASK_DELETE_ALL:
      handleDeleteAllTask();
      break;

    case MessageType.LOGOUT:
      handleLogout(data);
      break;

    case MessageType.TYPE_40:
      handleNotification(data);
      break;

    case MessageType.STATISTIC_USER:
      handleStatisticUser(data);
      break;

    case MessageType.STATISTIC_TASK:
      handleStatisticTask(data);
      break;

    case MessageType.STATISTIC_TASK_PER_STATUS:
      handleStatisticTaskPerStatus(data);
      break;

    case MessageType.STATISTIC_REGISTRATION:
      handleStatisticRegistration(data);
      break;

    case MessageType.STATISTIC_TASK_COMULATIVE:
      handleStatisticTaskComulative(data);
      break;

    case MessageType.STATISTIC_CATEGORY_COUNT:
      handleStatisticCategoryCount(data);
      break;

    case MessageType.STATISTIC_ACTIVE_USERS:
      handleStatisticActiveUsers(data);
      break;

    case "error":
      console.error("Erro recebido", data);
      break;
    default:
      console.error("Tipo desconhecido, ou não contem type", data);
  }

  function handleMessage(data) {
    const selectedUser = webSocketStore.getState().selectedUser;
    if (data.sender === selectedUser) {
      websockets.addMessage(data);
      sendReadConfirmation(data);
    }
  }

  function handleMessageSender(data) {
    websockets.addMessage(data);
  }

  function handleMessageRead() {
    websockets.markAsRead();
  }

  function handleNotification(data) {
    let selectedUser = webSocketStore.getState().selectedUser;
    if (data.sender !== selectedUser) {
      notifications.addNotification(data);
      notifications.addNotificationCounter();
    }
  }
  function handleLogout(data) {
    twarn("Time out, you are logged out!");
    userStore.getState().logout();
    window.location.href = "/login";
  }
  function handleNewTask(data) {
    tinfo("New task created!");
    // tasks.addTask(data, data.status);
    allTasks.addTaskToAll(data);
  }
  function handleMoveTask(data) {
    allTasks.updateTaskToAll(data);
  }
  function handleDeleteTask(data) {
    // tasks.removeTask(data.id, data.status);
    allTasks.deleteTaskToAll(data.id);
  }
  function handleRestoreAllTask(data) {
    // tasks.restoreAllTask(data);
    allTasks.restoreAllTasks();
  }

  function handleDeleteAllTask() {
    // tasks.deleteAllTask();
    allTasks.deleteAllTasks();
  }

  function handleEditTask(data) {
    // tasks.updateTask(data, data.status, data.index);

    allTasks.updateTaskToAll(data);
  }
  function handleDesactivateTask(data) {
    // tasks.removeTask(data.id, data.status);

    // tasks.addDeletedTask(data);

    // allTasks.addDeletedTask(data);

    allTasks.updateTaskToAll(data);
  }
  function handleStatisticUser(data) {
    statistics.setCountUsers(data.countUsers);
    statistics.setConfirmedUsers(data.confirmedUsers);
    statistics.setUnconfirmedUsers(data.unconfirmedUsers);
    // state.addChartUserChange();
  }
  function handleStatisticTask(data) {
    statistics.setAvgTasksPerUser(data.avgTaskPerUser);
  }
  function handleStatisticTaskPerStatus(data) {
    statistics.setTodoPerUser(data.todoPerUser);
    statistics.setDoingPerUser(data.doingPerUser);
    statistics.setDonePerUser(data.donePerUser);
    statistics.setAvgTimeToBeDone(data.avgTimeToBeDone);
  }
  function handleStatisticRegistration(data) {
    // console.log(data);
    statistics.setChartUserPerTime(data.data);
  }
  function handleStatisticTaskComulative(data) {
    // console.log(data);
    statistics.setChartTaskComulative(data.data);
    // state.addChartTaskChange();
  }
  function handleStatisticCategoryCount(data) {
    statistics.setCategoryListOrdered(data.data);
    // console.log(data);
  }
  function handleRestoreTask(data) {
    // taskStore.getState().addTask(data, data.status);

    allTasks.restoreTaskToAll(data.id);
  }

  function sendReadConfirmation(data) {
    const readConfirmation = {
      type: MessageType.MESSAGE_READ_CONFIRMATION,
      receiver: data.sender,
      id: data.id,
    };
    // console.log("Sending read confirmation", readConfirmation);
    let jsonString = JSON.stringify(readConfirmation);
    websockets.send(jsonString);
  }
  function handleMessageMarkAsRead(data) {
    websockets.markAsRead(data);
    // console.log("Message marked as read", data);
  }
  function handleStatisticActiveUsers(data) {
    statistics.setActiveUsers(data.activeUsers);
    statistics.setInactiveUsers(data.inactiveUsers);
    // console.log(data);
  }
}
export { handleWebSocketJSON };
