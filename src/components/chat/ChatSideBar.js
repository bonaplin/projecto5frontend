import React, { useState, useEffect, useRef } from "react";
import "./ChatSidebar.css";
import { userStore } from "../../stores/UserStore";
import { webSocketStore } from "../../stores/WebSocketStore";
import { tsuccess, twarn } from "../messages/Message";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageBubble from "./MessageBubble";
import MessageType from "../websockets/MessageType";
function ChatSideBar({ onClose }) {
  const token = userStore.getState().token;
  const username = userStore.getState().username;
  const { selectedUser } = useParams();
  const [sendMessage, setSendMessage] = useState();
  const { socket } = webSocketStore();

  useEffect(() => {
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages/${username}/${selectedUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar mensagens");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mensagens recebidas", data);
        // Atualize a webSocketStore com as mensagens recebidas
        webSocketStore.getState().setMessages(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens", error);
      });
  }, [socket, token]);

  //sempre que a lista de mensagens for atualizada, faz scroll para o final
  useEffect(() => {
    scrollToBottom("messages");
  }, [webSocketStore.getState().messages]);

  function scrollToBottom(elementId) {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      element.scrollTop = element.scrollHeight;
    }, 0);
  }
  // scroll to bottom ^^
  function handleSubmit(e) {
    e.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN) {
      let messageToSend = {
        message: sendMessage,
        // senderToken: token,
        receiver: selectedUser,
        type: MessageType.TYPE_10,
      };

      let messageJSON = JSON.stringify(messageToSend);
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
        <div className="messages" id="messages">
          {webSocketStore.getState().messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message.message}
              read={message.read}
              receiver={message.receiver}
              sender={message.sender}
              time={message.time}
              selectedUser={selectedUser}
              isOwnMessage={message.sender === username}
            />
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
