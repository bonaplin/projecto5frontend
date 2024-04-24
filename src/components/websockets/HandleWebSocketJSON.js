import { webSocketStore } from "../../stores/WebSocketStore";
import { notificationStore } from "../../stores/NotificationStore";
import { userStore } from "../../stores/UserStore";
import { taskStore } from "../../stores/TaskStore";
import { statisticsStore } from "../../stores/Statistics";
import { tsuccess, twarn, tinfo, tdefault } from "../messages/Message";
import MessageType from "./MessageType";
import { Addchart } from "@mui/icons-material";

function handleWebSocketJSON(json) {
  let data;
  const statistics = statisticsStore.getState();
  const notifications = notificationStore.getState();
  const tasks = taskStore.getState();
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
      // console.log("Mensagem recebida 10", data);
      handleMessage(data);
      break;
    case MessageType.MESSAGE_RECEIVER:
      // console.log("Mensagem recebida 11", data);
      handleMessageSender(data);
      break;
    case MessageType.TYPE_20:
      // handleNotification(data);
      break;
    case MessageType.TASK_CREATE:
      handleNewTask(data);
      // console.log("Mensagem recebida 21", data);
      break;
    case MessageType.TASK_MOVE:
      handleMoveTask(data);
      break;
    case MessageType.TASK_EDIT:
      // console.log("Mensagem recebida 23", data);
      handleEditTask(data);
      break;
    case MessageType.TASK_EDIT_AND_MOVE:
      // console.log("Mensagem recebida 24", data);
      handleMoveTask(data);
      break;
    case MessageType.TASK_DESACTIVATE:
      // console.log("Mensagem recebida 25 é para desactivar!", data);
      handleDesactivateTask(data);
      break;
    case MessageType.TASK_DELETE:
      handleDeleteTask(data);
      // console.log("Mensagem recebida 26 é para apagar!", data);
      break;
    case MessageType.TASK_RESTORE:
      // console.log("Mensagem recebida 27 é para apagar!", data);
      handleRestoreTask(data);
      break;
    case MessageType.LOGOUT:
      handleLogout(data);
      break;
    case MessageType.TYPE_40:
      handleNotification(data);
      break;
    case MessageType.STATISTIC_USER:
      // console.log("Mensagem recebida 31", data);
      handleStatisticUser(data);
      break;
    case MessageType.STATISTIC_TASK:
      // console.log("Mensagem recebida 32", data);
      handleStatisticTask(data);
      break;
    case MessageType.STATISTIC_TASK_PER_STATUS:
      // console.log("Mensagem recebida 33", data);
      handleStatisticTaskPerStatus(data);
      break;
    case MessageType.STATISTIC_REGISTRATION:
      // console.log("Mensagem recebida 34", data);
      handleStatisticRegistration(data);
      break;
    case MessageType.STATISTIC_TASK_COMULATIVE:
      // console.log("Mensagem recebida 35", data);
      handleStatisticTaskComulative(data);
      break;
    case MessageType.STATISTIC_CATEGORY_COUNT:
      handleStatisticCategoryCount(data);
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
    }
  }

  function handleMessageSender(data) {
    websockets.addMessage(data);
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
    users.logout();
  }
  function handleNewTask(data) {
    tinfo("New task created!");
    tasks.addTask(data, data.status);
  }
  function handleMoveTask(data) {
    console.log(data);
    tasks.removeTask(data.id, data.lastStatus);
    tasks.addTask(data, data.status, data.index);
  }
  function handleDeleteTask(data) {
    // tasks.removeTask(data.id, data.status);
  }

  function handleEditTask(data) {
    tasks.updateTask(data, data.status, data.index);
  }
  function handleDesactivateTask(data) {
    tasks.removeTask(data.id, data.status);
    tasks.addDeletedTask(data);
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
    console.log(data);
  }
  function handleRestoreTask(data) {
    taskStore.getState().addTask(data, data.status);
  }
}
export { handleWebSocketJSON };
