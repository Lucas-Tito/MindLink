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
  const [patientId, setPatientId] = useState("");

  const handleSearch = (term) => {
    console.log("Termo de busca:", term);
  };

  useEffect(() => {
    const fetchUserTypeAndId = async () => {
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
            userConnectionQuery.forEach((doc) => {
              const connectionData = doc.data();
              const id = isProfessional
                ? connectionData.patientId
                : connectionData.professionalId;
              setPatientId(id);
            });
          } else {
            console.log("No connections found for this user.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar patientId:", error);
      }
    };

    fetchUserTypeAndId();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (!patientId) return;

      try {
        const response = await fetch(
          `http://localhost:3000/mindlink/users/${patientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        const usuariosArray = Array.isArray(data) ? data : [data];
        setUsuarios(usuariosArray);
        setQtdMensagens(usuariosArray.length); // Atualiza a quantidade de mensagens com o tamanho do array
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setQtdMensagens(0);
      }
    };

    fetchUsuarios();
  }, [patientId]);

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
