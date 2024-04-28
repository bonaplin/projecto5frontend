import React, { useState, useEffect, useRef } from "react";
import "./ChatSidebar.css";
import { userStore } from "../../stores/UserStore";
import { webSocketStore } from "../../stores/WebSocketStore";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageBubble from "./MessageBubble";
import MessageType from "../websockets/MessageType";
function ChatSideBar({ onClose }) {
  const { selectedUser } = useParams();
  useEffect(() => {
    webSocketStore.getState().setSelectedUser(selectedUser);
    // console.log("selectedUser", selectedUser);

    return () => {
      webSocketStore.getState().setSelectedUser(null);
    };
  }, [selectedUser]);

  const token = userStore.getState().token;
  const username = userStore.getState().username;
  const [sendMessage, setSendMessage] = useState();
  const { socket } = webSocketStore();
  const messagesEndRef = useRef(null);
  const { messages } = webSocketStore((state) => state);

  // when the component is unmounted, set the selectedUser to null

  useEffect(() => {
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages/${username}/${selectedUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar mensagens");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("GET messages with user");
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
  }, [messages]);

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
        receiver: selectedUser,
        type: MessageType.MESSAGE_SENDER,
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
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messages-container">
        <div className="messages" id="messages">
          {messages.map((message, index) => (
            <MessageBubble
              id={message.id}
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
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-footer">
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
    </>
  );
}

export default ChatSideBar;
