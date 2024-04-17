import { webSocketStore } from "../../stores/WebSocketStore";
import { notificationStore } from "../../stores/NotificationStore";
import { userStore } from "../../stores/UserStore";
import { taskStore } from "../../stores/TaskStore";
import { tsuccess, twarn, tinfo, tdefault } from "../messages/Message";
import MessageType from "./MessageType";

function handleWebSocketJSON(json) {
  const username = userStore.getState().username;
  let data;

  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON", json);
    return;
  }

  switch (data.type) {
    case MessageType.TYPE_10:
      console.log("Mensagem recebida 10", data);
      handleMessage(data);
      break;
    case MessageType.TYPE_20:
      // handleNotification(data);
      break;
    case MessageType.TASK_CREATE:
      handleNewTask(data);
      console.log("Mensagem recebida 21", data);
      break;
    case MessageType.LOGOUT:
      handleLogout(data);
      break;
    case MessageType.TYPE_40:
      handleNotification(data);
      break;

    case "error":
      console.error("Erro recebido", data);
      break;
    default:
      console.error("Tipo desconhecido, ou não contem type", data);
  }

  function handleMessage(data) {
    if (data.receiver === username) {
      // Se o usuário for o destinatário da mensagem, exiba-a
    }
    // Adicione a nova mensagem à webSocketStore
    webSocketStore.getState().addMessage(data);
  }
  function handleNotification(data) {
    notificationStore.getState().addNotification(data);
    notificationStore.getState().addNotificationCounter();
  }
  function handleLogout(data) {
    twarn("Time out, you are logged out!");
    userStore.getState().logout();
  }
  function handleNewTask(data) {
    tinfo("New task created!");
    taskStore.getState().addTask(data);
  }
}
export { handleWebSocketJSON };
