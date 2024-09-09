import React, { useState, useEffect } from "react";
import "./style.css";
import CardChat from "./CardChat";
import SearchBar from "../MenuSidebar/Search/Search";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

const ChatSidebar = ({ onSelectUser }) => {
  const [qtdMensagens, setQtdMensagens] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [ids, setIds] = useState([]);
  const [lastMessages, setLastMessages] = useState({}); // Armazena últimas mensagens

  const handleSearch = (term) => {
    console.log("Termo de busca:", term);
  };

  // Função para buscar a última mensagem de um usuário
  // Função para buscar a última mensagem
  const fetchLastMessage = async (id) => {
    try {
      const messagesSnapshot = await firestore
        .collection("messages")
        .where("participants", "array-contains", id)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();

      // Verifica se há mensagens para os participantes
      if (!messagesSnapshot.empty) {
        const lastMessageData = messagesSnapshot.docs[0].data();

        // Verifica se o id do receiverId ou senderId corresponde ao usuário atual
        if (lastMessageData.participants.includes(auth.currentUser.uid)) {
          return {
            text: lastMessageData.text,
            createdAt: lastMessageData.createdAt,
          };
        }
      }
    } catch (error) {
      console.error("Erro ao buscar última mensagem:", error);
    }

    // Retorna um valor padrão quando não há mensagens
    return { text: "Nenhuma mensagem", createdAt: null };
  };

  useEffect(() => {
    const fetchUserTypeAndIds = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userResponse = await fetch(
            `http://localhost:3000/mindlink/users/${user.uid}`
          );
          if (!userResponse.ok) {
            throw new Error(`HTTP error! Status: ${userResponse.status}`);
          }
          const userData = await userResponse.json();
          const isProfessional = userData.professionalType === true;

          const userConnectionQuery = await firestore
            .collection("UsersConnections")
            .where(
              isProfessional ? "professionalId" : "patientId",
              "==",
              user.uid
            )
            .get();

          if (!userConnectionQuery.empty) {
            const idsArray = [];
            userConnectionQuery.forEach((doc) => {
              const connectionData = doc.data();
              const id = isProfessional
                ? connectionData.patientId
                : connectionData.professionalId;
              if (!idsArray.includes(id)) {
                idsArray.push(id);
              }
            });
            setIds(idsArray);
          } else {
            console.log("Nenhuma conexão encontrada para este usuário.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar IDs:", error);
      }
    };

    fetchUserTypeAndIds();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (ids.length === 0) return;

      try {
        const fetchPromises = ids.map((id) =>
          fetch(`http://localhost:3000/mindlink/users/${id}`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            }
          )
        );

        const usersData = await Promise.all(fetchPromises);

        const combinedUsers = usersData.flat();
        console.log("Dados recebidos da API:", combinedUsers);

        setUsuarios(combinedUsers);
        setQtdMensagens(combinedUsers.length);

        // Limpa as últimas mensagens antes de buscar novas
        setLastMessages({});

        // Para cada usuário, busca a última mensagem
        combinedUsers.forEach(async (user) => {
          const lastMessageData = await fetchLastMessage(user.uid);
          setLastMessages((prevState) => ({
            ...prevState,
            [user.uid]: lastMessageData,
          }));
        });
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setQtdMensagens(0);
      }
    };

    fetchUsuarios();
  }, [ids]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="sidebar2 sidebar2-right">
      <div className="sidebar2-header">
        <h2>Mensagens</h2>
        <div className="message-count">{qtdMensagens}</div>
      </div>
      <ul>
        <li>
          <SearchBar onSearch={handleSearch} />
        </li>
        {Array.isArray(usuarios) && usuarios.length > 0 ? (
          usuarios.map(
            (usuario, index) =>
              usuario?.uid !== auth.currentUser?.uid && (
                <li key={index} onClick={() => onSelectUser(usuario)}>
                  <CardChat
                    nome={usuario.name}
                    photoURL={usuario.photoURL}
                    lastMessage={lastMessages[usuario.uid]?.text}
                    lastMessageTime={formatTimestamp(
                      lastMessages[usuario.uid]?.createdAt
                    )}
                  />
                </li>
              )
          )
        ) : (
          <li>Nenhum usuário encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default ChatSidebar;
