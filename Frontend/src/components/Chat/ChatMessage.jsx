import React from "react";
import firebase from "firebase/compat/app";
import "./style.css"; // Importe o arquivo de estilo aqui

const auth = firebase.auth();

function ChatMessage(props) {
  const { text, senderId } = props.message;

  const messageClass =
    senderId === auth.currentUser.uid ? "message-sent" : "message-received";

  return (
    <div className={`message ${messageClass}`}>
      {" "}
      {/* Use className aqui */}
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
