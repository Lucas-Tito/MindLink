import React, { useRef, useState } from "react";
import "./style.css";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2";

import firebase from "firebase/compat/app"; // Importação do Firebase
import { useCollectionData } from "react-firebase-hooks/firestore"; // Importação do hook useCollectionData
import ChatMessage from "./ChatMessage"; // Importação do componente ChatMessage
import SignOut from "../Login/SignOut";

const auth = firebase.auth(); // Instância de autenticação do Firebase
const firestore = firebase.firestore(); // Instância do Firestore do Firebase
const ChatRoom = () => {
  const dummy = useRef(); // Referência para o último elemento da lista de mensagens
  const messagesRef = firestore.collection("messages"); // Referência para a coleção "messages" no Firestore
  const query = messagesRef.orderBy("createdAt").limit(25); // Query para obter as últimas 25 mensagens, ordenadas por data de criação

  // useCollectionData é um hook que sincroniza automaticamente uma coleção do Firestore com um estado local
  const [messages] = useCollectionData(query, { idField: "id" }); // Array de mensagens e atualização automática do estado quando a coleção muda

  const [formValue, setFormValue] = useState(""); // Estado local para armazenar o valor do formulário de entrada

  // Função assíncrona para enviar uma nova mensagem
  const sendMessage = async (e) => {
    e.preventDefault(); // Prevenir o comportamento padrão do formulário

    const { uid } = auth.currentUser; // ID do usuário atualmente autenticado

    // Adiciona uma nova mensagem ao Firestore com o texto, a data de criação e o ID do usuário
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Marca de tempo do servidor para garantir ordem correta das mensagens
      uid,
    });

    setFormValue(""); // Limpa o campo de entrada após o envio da mensagem
    dummy.current.scrollIntoView({ behavior: "smooth" }); // Rola a tela para a última mensagem
  };
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
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          {/* Espaço reservado para rolar a tela para a última mensagem */}
          <span ref={dummy}></span>
        </div>
        <div className="message-input">
          <textarea
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="input-text"
          ></textarea>
          <button
            onClick={sendMessage}
            disabled={!formValue}
            className="send-button"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
