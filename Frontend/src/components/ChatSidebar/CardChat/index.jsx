import React from "react";
import "./style.css";

const CardChat = ({ nome, photoURL, lastMessage, lastMessageTime }) => {
  return (
    <div className="whatsapp-card">
      {photoURL ? (
        <img src={photoURL} alt="Foto da pessoa" className="avatar" />
      ) : (
        <div className="default-avatar">Avatar padrão</div>
      )}
      <div className="message-info">
        <div className="details">
          <p>{nome}</p>
          <span>{lastMessageTime || "Sem horário"}</span>
        </div>
        <div className="message">
          <span>{lastMessage || "Nenhuma mensagem"}</span>
        </div>
      </div>
    </div>
  );
};

export default CardChat;
