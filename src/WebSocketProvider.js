import { useEffect } from "react";
import { webSocketStore } from "./stores/WebSocketStore";
import { terror, tsuccess, twarn } from "./components/messages/Message";
import { userStore } from "./stores/UserStore";

function WebSocketProvider({ children, token }) {
  // const { token } = userStore();
  const { setSocket } = webSocketStore();

  useEffect(() => {
    if (!token) {
      return;
    }
    console.log("A abrir websocket...");

    const socket = new WebSocket("ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/message/" + token);

    socket.onopen = function (e) {
      tsuccess("Conexão WebSocket aberta");
      console.log("Conexão WebSocket aberta", e);
    };

    socket.onmessage = function (e) {
      tsuccess("Mensagem recebida", e.data);
    };

    socket.onerror = function (e) {
      terror("Erro websocket");
      console.log(`Erro websocket ${e.data}`);
    };

    socket.onclose = function (e) {
      console.log("WebSocket connection closed:", e.reason);
    };

    setSocket(socket);
    // Limpeza ao desmontar
    return () => socket.close();
  }, [token, setSocket]); // Adicione o token como uma dependência

  return children;
}

export default WebSocketProvider;
