import { webSocketStore } from "../../stores/WebSocketStore";
import { notificationStore } from "../../stores/NotificationStore";
import { userStore } from "../../stores/UserStore";
import { taskStore } from "../../stores/TaskStore";
import { statisticsStore } from "../../stores/Statistics";
import { tsuccess, twarn, tinfo, tdefault } from "../messages/Message";
import MessageType from "./MessageType";

function handleWebSocketJSON(json) {
  let data;
  const state = statisticsStore.getState();
  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON", json);
    return;
  }

  switch (data.type) {
    case MessageType.MESSAGE_SENDER:
      console.log("Mensagem recebida 10", data);
      handleMessage(data);
      break;
    case MessageType.MESSAGE_RECEIVER:
      console.log("Mensagem recebida 11", data);
      handleMessageSender(data);
      break;
    case MessageType.TYPE_20:
      // handleNotification(data);
      break;
    case MessageType.TASK_CREATE:
      handleNewTask(data);
      console.log("Mensagem recebida 21", data);
      break;
    case MessageType.TASK_MOVE:
      handleMoveTask(data);
      break;
    case MessageType.TASK_EDIT:
      console.log("Mensagem recebida 23", data);
      handleEditTask(data);
      break;
    case MessageType.TASK_EDIT_AND_MOVE:
      console.log("Mensagem recebida 24", data);
      handleMoveTask(data);
      break;
    case MessageType.TASK_DESACTIVATE:
      console.log("Mensagem recebida 25 é para desactivar!", data);
      handleDesactivateTask(data);
      break;
    case MessageType.TASK_DELETE:
      console.log("Mensagem recebida 26 é para apagar!", data);
      break;
    case MessageType.LOGOUT:
      handleLogout(data);
      break;
    case MessageType.TYPE_40:
      handleNotification(data);
      break;
    case MessageType.STATISTIC_USER:
      console.log("Mensagem recebida 31", data);
      handleStatisticUser(data);
      break;
    case MessageType.STATISTIC_TASK:
      console.log("Mensagem recebida 32", data);
      handleStatisticTask(data);
      break;
    case MessageType.STATISTIC_TASK_PER_STATUS:
      console.log("Mensagem recebida 33", data);
      handleStatisticTaskPerStatus(data);
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
      webSocketStore.getState().addMessage(data);
    }
  }

  function handleMessageSender(data) {
    webSocketStore.getState().addMessage(data);
  }

  function handleNotification(data) {
    let selectedUser = webSocketStore.getState().selectedUser;
    if (data.sender !== selectedUser) {
      notificationStore.getState().addNotification(data);
      notificationStore.getState().addNotificationCounter();
    }
  }
  function handleLogout(data) {
    twarn("Time out, you are logged out!");
    userStore.getState().logout();
  }
  function handleNewTask(data) {
    tinfo("New task created!");
    taskStore.getState().addTask(data, data.status);
  }
  function handleMoveTask(data) {
    console.log(data);
    taskStore.getState().removeTask(data.id, data.lastStatus);
    taskStore.getState().addTask(data, data.status, data.index);

    // taskStore.getState().moveTask(data);
  }
  // function handleEditTaskAndMove(data) {
  //   console.log("retirar do array a task com id " + data.id + " e adicionar ao array com o status:" + data.status + " e remover do " + data.lastStatus);
  //   taskStore.getState().removeTask(data.id, data.lastStatus);
  //   taskStore.getState().addTask(data, data.status);
  // }
  function handleEditTask(data) {
    taskStore.getState().updateTask(data, data.status, data.index);
  }
  function handleDesactivateTask(data) {
    taskStore.getState().removeTask(data.id, data.status);
  }
  function handleStatisticUser(data) {
    statisticsStore.getState().setCountUsers(data.countUsers);
    statisticsStore.getState().setConfirmedUsers(data.confirmedUsers);
    statisticsStore.getState().setUnconfirmedUsers(data.unconfirmedUsers);
  }
  function handleStatisticTask(data) {
    statisticsStore.getState().setAvgTasksPerUser(data.avgTasksPerUser);
  }
  function handleStatisticTaskPerStatus(data) {
    state.setTodoPerUser(data.todoPerUser);
    state.setDoingPerUser(data.doingPerUser);
    state.setDonePerUser(data.donePerUser);
  }
}
export { handleWebSocketJSON };
