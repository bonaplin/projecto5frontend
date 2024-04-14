function MessageBubble(props) {
  // const teste = props.sender;
  // console.log("teste", teste);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: props.isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: props.isOwnMessage ? "#ff88" : "#c6c6c6",
            alignSelf: props.isOwnMessage ? "flex-start" : "flex-end",
            fontSize: "15px",
            color: "black",
            textAlign: "right",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
            maxWidth: "80%", // Para evitar que a mensagem ocupe toda a largura disponível
          }}
        >
          {props.message}
          <div
            style={{
              fontSize: "10px",
              marginTop: "5px",

              textAlign: props.isOwnMessage ? "right" : "left",
            }}
          >
            {new Date(props.time).toLocaleDateString() + " " + new Date(props.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MessageBubble;
