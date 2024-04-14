import { webSocketStore } from "../../stores/WebSocketStore";
import { tsuccess } from "../messages/Message";

function handleWebSocketJSON(json) {
  let data;

  //   console.log("a tentar desserializar JSON", json);

  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON", json);
    return;
  }

  //   console.log("verificar o type do JSON");

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
    //a mensagem que eu enviar para outro user, volta para mim como websocket.
    // webSocketStore.getState().addMessage({
    //   message: data.message,
    //   senderToken: data.senderToken,
    //   receiverUsername: data.receiverUsername,
    //   timestamp: new Date(),
    // });
  }
  function handleNotification(data) {
    console.log("Notificação recebida", data);
  }
}
export { handleWebSocketJSON };
