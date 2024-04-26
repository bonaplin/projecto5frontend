import { useEffect, useState } from "react";
import { webSocketStore } from "./stores/WebSocketStore";
import { terror } from "./components/messages/Message";
import { handleWebSocketJSON } from "./components/websockets/HandleWebSocketJSON";

function WebSocketProvider({ children, token }) {
  const { setSocket } = webSocketStore();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const ws = new WebSocket("ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/notifier/" + token);

    ws.onopen = function (e) {
      console.log("Conexão WebSocket aberta");
    };

    ws.onmessage = function (e) {
      handleWebSocketJSON(e.data);
    };

    ws.onerror = function (e) {
      terror("Erro websocket");
    };

    ws.onclose = function (e) {
      if (e.code !== 1000) {
        let times = 0;
        setTimeout(() => {
          console.log("Tentando reconectar: " + times++ + "'x");
          setConnected(!connected);
        }, 1000); // Tenta reconectar a cada 1 segundos
      }
    };

    setSocket(ws);
    // Limpeza ao desmontar
    return () => ws.close();
  }, [token, setSocket, connected]);

  return children;
}

export default WebSocketProvider;
