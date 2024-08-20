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

  const handleSearch = (term) => {
    console.log("Termo de busca:", term);
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
                idsArray.push(id); // Adiciona o ID ao array se não estiver presente
              }
            });
            setIds(idsArray);
          } else {
            console.log("No connections found for this user.");
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
        // Faz a requisição para todos os IDs
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

        // Aguarda todas as promessas de busca serem concluídas
        const usersData = await Promise.all(fetchPromises);

        // Combina todos os dados recebidos em um único array
        const combinedUsers = usersData.flat();
        console.log("Dados recebidos da API:", combinedUsers);

        setUsuarios(combinedUsers);
        setQtdMensagens(combinedUsers.length); // Atualiza a quantidade de mensagens com o tamanho do array
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setQtdMensagens(0);
      }
    };

    fetchUsuarios();
  }, [ids]);

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
                  <CardChat nome={usuario.name} photoURL={usuario.photoURL} />
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
