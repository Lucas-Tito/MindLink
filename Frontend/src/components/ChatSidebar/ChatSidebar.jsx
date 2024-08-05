import React, { useState, useEffect } from "react";
import "./style.css";
import CardChat from "./CardChat"; // Componente CardChat
import SearchBar from "../MenuSidebar/Search/Search"; // Componente SearchBar
import firebase from "firebase/compat/app"; // Importação do Firebase compat

// Inicialização da autenticação do Firebase
const auth = firebase.auth();

const ChatSidebar = ({ onSelectUser }) => {
  // Estados para armazenar a quantidade de mensagens e a lista de usuários
  const [qtdMensagens, setQtdMensagens] = useState(0);
  const [usuarios, setUsuarios] = useState([]);

  // Função para lidar com a busca
  const handleSearch = (term) => {
    console.log("Termo de busca:", term);
  };

  // useEffect para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Faz uma requisição GET para a API
        const response = await fetch("http://localhost:3000/mindlink/users");

        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();
        console.log("Dados recebidos da API:", data); // Log dos dados recebidos
        setUsuarios(data); // Atualiza o estado de usuários com os dados recebidos
        setQtdMensagens(data.length - 1); // Atualiza o estado da quantidade de mensagens
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    // Chama a função fetchUsuarios quando o componente é montado
    fetchUsuarios();
  }, []);

  return (
    <div className="sidebar2 sidebar2-right">
      <div className="sidebar2-header">
        <h2>Mensagens</h2>
        <div className="message-count">{qtdMensagens}</div>
      </div>
      <ul>
        <li>
          <SearchBar onSearch={handleSearch} />{" "}
          {/* Renderiza a barra de busca */}
        </li>
        {usuarios.map(
          (usuario, index) =>
            // Renderiza o CardChat apenas se o ID do usuário não for igual ao ID do usuário atual
            usuario?.uid !== auth.currentUser?.uid && (
              <li key={index} onClick={() => onSelectUser(usuario)}>
                <CardChat nome={usuario.name} photoURL={usuario.photoURL} />{" "}
                {/* Renderiza o CardChat com o nome e foto do usuário */}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default ChatSidebar;
