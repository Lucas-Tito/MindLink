import React, { useState } from "react";
import "./style.css";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2";

const ChatRoom = () => {
  const [messageReceived, setmessageReceived] = useState([
    {
      message: "Bora baitola",
      time: "10:05",
      isReceived: true, // Indica que é uma mensagem recebida
    },
    {
      message: "Sexo então",
      time: "10:15",
      isReceived: false, // Indica que é uma mensagem recebida
    },
    {
      message: "Sexo então",
      time: "10:15",
      isReceived: true, // Indica que é uma mensagem recebida
    },
    {
      message: "Sexo então",
      time: "10:15",
      isReceived: false, // Indica que é uma mensagem recebida
    },
  ]);

  return (
    <div>
      <Sidebar />
      <Sidebar2 />
      <div className="chat-room">
        <div className="chat-header">
          <img
            src="caminho_para_a_sua_foto"
            alt="Foto do Usuário"
            className="user-avatar"
          />
          <h3 className="user-name">Nome do Usuário</h3>
        </div>
        <div className="chat-messages">
          {messageReceived.map((message, index) => (
            <div
              className={
                message.isReceived ? "message-received" : "message-sent"
              }
              key={index}
            >
              <p>{message.message}</p>
              <span className="time">{message.time}</span>
            </div>
          ))}
          {/* Adicione mais mensagens aqui */}
        </div>
        <div className="message-input">
          <textarea
            placeholder="Digite sua mensagem..."
            className="input-text"
          ></textarea>
          <button className="send-button">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
