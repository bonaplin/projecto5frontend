import React, { useState, useEffect, useRef } from "react";

import "./ChatSidebar.css";
import { userStore } from "../../stores/UserStore";
import { tsuccess, twarn } from "../messages/Message";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageBubble from "./MessageBubble";
function ChatSideBar({ onClose }) {
  const token = userStore.getState().token;
  // Cria uma referência para o socket usando useRef.
  // A propriedade .current da referência será usada para armazenar o socket.
  // useRef retorna um objeto mutável onde .current é inicializado como null.
  const socketRef = useRef(null);
  const { selectedUser } = useParams();
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/message/" + token);

    socketRef.current.onopen = function (e) {
      console.log("Conexão WebSocket aberta", e);
      //socketRef.current.send(`Chat open with token: ${token}(sender) to user: ${selectedUser}(receiver)`);
    };

    socketRef.current.onmessage = function (e) {
      try {
        let data = JSON.parse(e.data);
        let message = data.message;

        setMessages((prevMessages) => [...prevMessages, message]);
        console.log(`Mensagem recebida do servidor: ${message}`);
      } catch (error) {
        console.log("Erro ao analisar a mensagem recebida: ", e.data);
      }
    };

    socketRef.current.onerror = function (e) {
      console.log(`Erro websocket ${e.data}`);
    };

    socketRef.current.onclose = function (e) {
      console.log("websocket fechada", e);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // Antes de enviar uma mensagem, verifica se o socket está aberto.
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("Mensagem do frontend: " + sendMessage + "\n\nUser com token: " + token + "\nPara user: " + selectedUser);

      // Create a JSON object
      let messageObject = {
        message: sendMessage,
        senderToken: token,
        receiverUsername: selectedUser,
        type: 10,
      };

      // Convert the object to a JSON string
      let messageJSON = JSON.stringify(messageObject);
      // Send the JSON string
      socketRef.current.send(messageJSON);
    }
    //limpar campos
    e.target.reset();
    setSendMessage("");
  }

  const [sendMessage, setSendMessage] = useState();

  function handleOnChange(e) {
    setSendMessage(e.target.value);
  }

  function handleOnClose(e) {
    socketRef.current.close();
    onClose();
  }

  return (
    <div className="chat-main">
      <div className="chat-sidebar">
        <div className="chat-title">
          <h3>{selectedUser}</h3> <CloseIcon onClick={handleOnClose} style={{ cursor: "pointer" }} />
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} owner={true} time={"10:23"} />
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
