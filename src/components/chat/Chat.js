import React, { useState } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

export default function Chat({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  if (!initialMessages || initialMessages.lenght === 0) {
    return <div>No messages</div>;
  }

  const handleSend = () => {
    if (input) {
      setMessages([...messages, { user: "You", text: input, isUser: true }]);
      setInput("");
    }
  };

  return (
    <div>
      {messages.map((message, index) => (
        <MessageBox key={index} position={message.isUser ? "right" : "left"} type={"text"} text={message.text} dateString={new Date().toLocaleString()} />
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
