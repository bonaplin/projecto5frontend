import { useEffect, useState } from "react";
import { webSocketStore } from "./stores/WebSocketStore";
import { terror, tsuccess, twarn, tinfo, tdefault } from "./components/messages/Message";
import { handleWebSocketJSON } from "./components/websockets/HandleWebSocketJSON";

function WebSocketProvider({ children, token }) {
  // const { token } = userStore();
  const { setSocket } = webSocketStore();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    // console.log("A abrir websocket...");

    const ws = new WebSocket("ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/notifier/" + token);

    ws.onopen = function (e) {
      tsuccess("Conexão WebSocket aberta");

      console.log("Conexão WebSocket aberta");
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
      // userStore.getState().logout();
      // Se a conexão foi fechada de forma não intencional, tente reconectar
      if (e.code !== 1000) {
        let times = 0;
        setTimeout(() => {
          console.log("Tentando reconectar: " + times++ + "'x");
          setConnected(!connected);
        }, 1000); // Tente reconectar a cada 5 segundos
      }
    };

    setSocket(ws);
    // Limpeza ao desmontar
    return () => ws.close();
  }, [token, setSocket, connected]); // Adicione o token como uma dependência

  return children;
}

export default WebSocketProvider;
