import { Done, DoneAll } from "@mui/icons-material";
function MessageBubble(props) {
  // const teste = props.sender;
  // console.log("teste", teste);
  return (
    <div className="message-div">
      <div
        style={{
          display: "flex",
          justifyContent: props.isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        <div
          className="message-bubble"
          style={{
            // color: props.isOwnMessage ? (props.read ? "black" : "white") : "black",
            backgroundColor: props.isOwnMessage ? "#ff88" : "#c6c6c6",
            alignSelf: props.isOwnMessage ? "flex-start" : "flex-end",
            fontSize: "15px",
            // color: "black",
            textAlign: "right",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
            maxWidth: "80%", // Para evitar que a mensagem ocupe toda a largura disponível
            wordWrap: "break-word", // Para partir as palavras que excedem
            boxShadow: "0px 1px 0px 0px rgba(0,0,0,0.30)",
            margin: "10px",
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
            {props.isOwnMessage ? "You: " : props.sender + ": "}
            {new Date(props.time).toLocaleDateString() + " " + new Date(props.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
            {props.isOwnMessage ? (
              props.read ? (
                <DoneAll style={{ fontSize: "medium", marginLeft: "5px", color: "cadetblue" }} />
              ) : (
                <Done style={{ marginLeft: "5px", fontSize: "medium", color: "gray" }} />
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MessageBubble;
