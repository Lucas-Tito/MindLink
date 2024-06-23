import React from "react";
import firebase from "firebase/compat/app";

const auth = firebase.auth();

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass =
    uid === auth.currentUser.uid ? "message-sent" : "mensage-received";

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
