import React, { useState } from "react";
import "./style.css";
import lazin from "../../assets/lazin.png";

const CardChat = () => {
  const [nome, setNome] = useState("Lazin de paula");
  const [horario, setHorario] = useState("14:30");
  return (
    <div>
      <div class="whatsapp-card">
        <img src={lazin} alt="Foto da pessoa" class="avatar" />
        <div class="message-info">
          <div class="details">
            <p>{nome}</p>
            <p>{horario}</p>
          </div>
          <div class="message">
            <p>nois da o cu porra 😛</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardChat;
