import { useEffect } from "react";
import { webSocketStore } from "./stores/WebSocketStore";
import { terror, tsuccess, twarn } from "./components/messages/Message";
import { handleWebSocketJSON } from "./components/websockets/HandleWebSocketJSON";

function WebSocketProvider({ children, token }) {
  // const { token } = userStore();
  const { setSocket } = webSocketStore();

  useEffect(() => {
    if (!token) {
      return;
    }
    console.log("A abrir websocket...");

    const ws = new WebSocket("ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/notifier/" + token);

    ws.onopen = function (e) {
      tsuccess("Conexão WebSocket aberta");
      // console.log("Conexão WebSocket aberta", e);
    };

    ws.onmessage = function (e) {
      handleWebSocketJSON(e.data);
    };

    ws.onerror = function (e) {
      terror("Erro websocket");
      // console.log(`Erro websocket ${e.data}`);
    };

    ws.onclose = function (e) {
      twarn("Conexão WebSocket fechada");
      // console.log("WebSocket connection closed:", e.reason);
    };

    setSocket(ws);
    // Limpeza ao desmontar
    return () => ws.close();
  }, [token, setSocket]); // Adicione o token como uma dependência

  return children;
}

export default WebSocketProvider;
