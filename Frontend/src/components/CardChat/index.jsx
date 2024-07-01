import React from "react";
import "./style.css";

const CardChat = ({ nome, photoURL }) => {
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
          <span>14:30</span>
        </div>
        <div className="message">
          <span>amongus</span>
        </div>
      </div>
    </div>
  );
};

export default CardChat;
