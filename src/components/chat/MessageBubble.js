function MessageBubble({ messageObj }) {
  const { message, isOwnMessage, timestamp } = messageObj;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: isOwnMessage ? "#ff88" : "#c6c6c6",
            alignSelf: isOwnMessage ? "flex-start" : "flex-end",
            fontSize: "15px",
            color: "black",
            textAlign: "right",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
            maxWidth: "80%", // Para evitar que a mensagem ocupe toda a largura disponível
          }}
        >
          {message}
          <div
            style={{
              fontSize: "10px",
              marginTop: "5px",

              textAlign: isOwnMessage ? "right" : "left",
            }}
          >
            {timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MessageBubble;
