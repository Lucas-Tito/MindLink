import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Importação do Firestore separadamente
import MenuSidebar from "../MenuSidebar/MenuSidebar"; // Componente Sidebar
import ChatMessage from "./ChatMessage"; // Componente ChatMessage
import ChatSidebar from "../ChatSidebar/ChatSidebar";
// Inicialização das instâncias de autenticação e Firestore
const auth = firebase.auth();
const firestore = firebase.firestore();

const ChatRoom = () => {
  const dummy = useRef(); // Referência para o final da lista de mensagens, para rolagem automática
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const [formValue, setFormValue] = useState(""); // Estado para armazenar o valor do formulário de entrada
  const [selectedUser, setSelectedUser] = useState(null); // Estado para armazenar o usuário selecionado

  // useEffect para buscar e atualizar mensagens sempre que selectedUser mudar
  useEffect(() => {
    if (selectedUser) {
      const userId1 = auth.currentUser.uid; // ID do usuário atual
      const userId2 = selectedUser.uid; // ID do usuário selecionado

      console.log("Fetching messages between:", userId1, "and", userId2);

      // Consulta ao Firestore para buscar mensagens onde userId1 é um dos participantes
      const query = firestore
        .collection("messages")
        .where("participants", "array-contains", userId1)
        .orderBy("createdAt")
        .limit(25);

      // Inscrição na consulta para atualizar mensagens em tempo real
      const unsubscribe = query.onSnapshot((snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((doc) => doc.participants.includes(userId2)); // Filtra mensagens com o outro participante

        console.log("Fetched messages:", data);
        setMessages(data); // Atualiza o estado messages com os dados recebidos do Firestore
        dummy.current.scrollIntoView({ behavior: "smooth" }); // Rola para o final da lista de mensagens
      });

      // Limpeza da inscrição na consulta quando o componente é desmontado ou selectedUser muda
      return () => unsubscribe();
    }
  }, [selectedUser]);

  // Função para enviar mensagem
  const sendMessage = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const { uid } = auth.currentUser; // ID do usuário atual
    const receiverId = selectedUser.uid; // ID do usuário selecionado

    console.log("Sending message to:", receiverId);

    // Adiciona uma nova mensagem ao Firestore
    await firestore.collection("messages").add({
      text: formValue, // Texto da mensagem
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp do servidor para a mensagem
      participants: [uid, receiverId], // IDs dos participantes da conversa
      senderId: uid, // ID do remetente
      receiverId: receiverId, // ID do destinatário
    });

    setFormValue(""); // Limpa o valor do formulário de entrada
  };

  return (
    <div>
      <MenuSidebar />
      <ChatSidebar onSelectUser={setSelectedUser} />{" "}
      {/* Renderiza o componente Sidebar2 e passa a função setSelectedUser como prop */}
      <div className="chat-room">
        <div className="chat-header">
          {selectedUser ? (
            <>
              <img
                src={selectedUser.photoURL}
                alt="Foto do Usuário"
                className="user-avatar"
              />
              <h3 className="user-name">{selectedUser.name}</h3>
            </>
          ) : (
            <h2 className="centered-message">
              Selecione um usuário para começarmos 😉
            </h2> // Mensagem centralizada
          )}
        </div>
        <div className="chat-messages">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} /> // Renderiza cada mensagem usando o componente ChatMessage
          ))}
          <span ref={dummy}></span> {/* Span vazio para rolagem automática */}
        </div>
        {selectedUser && ( // Mostrar o input e o botão apenas se um usuário estiver selecionado
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
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
