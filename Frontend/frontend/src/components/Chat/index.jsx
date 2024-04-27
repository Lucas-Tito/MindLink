import React from "react";
import "./style.css";

const ChatRoom = () => {
  return (
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
        <div className="message received">
          <p>Olá, como você está?</p>
          <span className="time">10:00</span>
        </div>
        <div className="message sent">
          <p>Estou bem, obrigado!</p>
          <span className="time">10:05</span>
        </div>
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
  );
};

export default ChatRoom;
