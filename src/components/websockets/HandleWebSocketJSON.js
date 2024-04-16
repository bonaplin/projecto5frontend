import { webSocketStore } from "../../stores/WebSocketStore";
import { userStore } from "../../stores/UserStore";
import { tsuccess, twarn, tinfo, tdefault } from "../messages/Message";
import MessageType from "./MessageType";

function handleWebSocketJSON(json) {
  const username = userStore.getState().username;
  const { notifications, addNotification } = webSocketStore.getState();
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
    case MessageType.LOGOUT:
      handleLogout(data);
      break;
    case MessageType.TYPE_40:
      handleNotification(data);
      console.log("Mensagem recebida", data);
      break;

    case "error":
      console.error("Erro recebido", data);
      break;
    default:
      console.error("Tipo desconhecido, ou não contem type", data);
  }

  function handleMessage(data) {
    if (data.receiver === username) {
      // tdefault("Nova mensagem recebida de: " + data.sender);
      //verificar se o user tem a janela aberta de chat com o sender antes de enviar o toast.
    }
    // Adicione a nova mensagem à webSocketStore
    webSocketStore.getState().addMessage(data);
  }
  function handleNotification(data) {
    addNotification(data);
    console.log("Notificação recebida", data);
  }
  function handleLogout(data) {
    twarn("Time out, you are logged out!");
    userStore.getState().logout();
  }
}
export { handleWebSocketJSON };
