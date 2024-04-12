function MessageBubble({ message, owner, time }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: owner ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: owner ? "#ff88" : "#c6c6c6",
          alignSelf: owner ? "flex-start" : "flex-end",
          fontSize: "15px",
          color: "black",
          textAlign: "right",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        {message}
      </div>
    </div>
  );
}
export default MessageBubble;
