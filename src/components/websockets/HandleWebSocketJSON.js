import { webSocketStore } from "../../stores/WebSocketStore";
import { userStore } from "../../stores/UserStore";
import { tsuccess } from "../messages/Message";

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
    case 10:
      handleMessage(data);
      break;
    case 20:
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
      tsuccess("Nova mensagem recebida de: " + data.sender);
      //verificar se o user tem a janela aberta de chat com o sender antes de enviar o toast.
    }
    // Adicione a nova mensagem à webSocketStore
    webSocketStore.getState().addMessage(data);
  }
  function handleNotification(data) {
    console.log("Notificação recebida", data);
  }
}
export { handleWebSocketJSON };
