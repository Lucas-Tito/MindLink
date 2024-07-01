import React, { useState, useEffect } from "react";
import "./style.css";
import CardChat from "../CardChat";
import SearchBar from "../Search";

const Sidebar2 = () => {
  const [qtdMensagens, setQtdMensagens] = useState(0);
  const [usuarios, setUsuarios] = useState([]);

  const handleSearch = (term) => {
    console.log("Termo de busca:", term);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/mindlink/users");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data); // Log dos dados recebidos
        setUsuarios(data);
        setQtdMensagens(data.length);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

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
          <SearchBar onSearch={handleSearch} />
        </li>
        {usuarios.map((usuario, index) => (
          <li key={index}>
            <CardChat nome={usuario.name} photoURL={usuario.photoURL} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar2;
