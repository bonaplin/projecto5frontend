import React, { useState, useEffect, useRef } from "react";
import "./ChatSidebar.css";
import { userStore } from "../../stores/UserStore";
import { webSocketStore } from "../../stores/WebSocketStore";
import { tsuccess, twarn } from "../messages/Message";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageBubble from "./MessageBubble";
function ChatSideBar({ onClose }) {
  const token = userStore.getState().token;
  const username = userStore.getState().username;
  const { selectedUser } = useParams();
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState();
  const { socket } = webSocketStore();

  useEffect(() => {
    if (socket) {
      socket.onmessage = function (e) {
        try {
          let data = JSON.parse(e.data);
          console.log("Mensagem recebida do servidor: ", data);
          let message = data.message;
          let timestamp = new Date(data.time);

          let isOwnMessage = data.sender === username; // Verifique se a mensagem foi enviada pelo usuário atual

          // Agora, cada "message" é um objeto com várias propriedades
          setMessages((prevMessages) => [...prevMessages, { message, isOwnMessage, timestamp }]);
          console.log(`Mensagem recebida do servidor: ${message}`);
        } catch (error) {
          console.log("Erro ao analisar a mensagem recebida: ", e.data);
        }
      };
    }
    // return () => {
    //   if (socket) {
    //     socket.close();
    //   }
    // };
  }, [socket, token]);

  function handleSubmit(e) {
    e.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN) {
      let messageObject = {
        message: sendMessage,
        // senderToken: token,
        receiver: selectedUser,
        type: 10,
      };

      let messageJSON = JSON.stringify(messageObject);
      socket.send(messageJSON);
    }

    e.target.reset();
    setSendMessage("");
  }

  function handleOnChange(e) {
    setSendMessage(e.target.value);
  }

  function handleOnClose(e) {
    onClose();
  }

  return (
    <div className="chat-main">
      <div className="chat-sidebar">
        <div className="chat-title">
          <h3>{selectedUser}</h3> <CloseIcon onClick={handleOnClose} style={{ cursor: "pointer" }} />
        </div>
        <div className="messages">
          {messages.map((messageObj, index) => (
            <MessageBubble key={index} messageObj={messageObj} />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="send">
            <input type="text" name="message" placeholder="Type a message" onChange={handleOnChange} />
            <button type="submit">
              <SendRoundedIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatSideBar;
