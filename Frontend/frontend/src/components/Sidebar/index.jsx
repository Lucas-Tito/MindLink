import React, { useState } from "react";
import "./style.css";

import homeIcon from "../../assets/home.svg";
import chatIcon from "../../assets/chatIcon.svg";
import logoIcon from "../../assets/Logo.svg";
import lupaIcon from "../../assets/lupaIcon.svg";
import engineIcon from "../../assets/engine.svg";
import cerebroIcon from "../../assets/cerebro.png";
import calendarIcon from "../../assets/calendar.svg";
import CardChat from "../CardChat";
import SearchBar from "../Search";
import ChatRoom from "../Chat";

const Sidebar = () => {
  const [qtdMensagens, setQtdMensagens] = useState(12);
  const handleSearch = (term) => {
    // Aqui você pode fazer algo com o termo de busca, como enviar para um servidor
    console.log("Termo de busca:", term);
  };

  return (
    <div>
      <div class="sidebar">
        <ul>
          <li>
            <img
              src={cerebroIcon}
              style={{
                width: "70px",
                left: "20px",
                position: "absolute",
                top: "30px",
              }}
            />
          </li>
          <li>
            <img
              src={homeIcon}
              style={{
                width: "40px",
                left: "30px",
                position: "absolute",
                top: "150px",
              }}
            />
          </li>
          <li>
            <img
              src={chatIcon}
              style={{
                width: "40px",
                left: "30px",
                position: "absolute",
                top: "230px",
              }}
            />
          </li>
          <li>
            <img
              src={lupaIcon}
              style={{
                width: "40px",
                left: "30px",
                position: "absolute",
                top: "300px",
              }}
            />
          </li>

          <li>
            <img
              src={engineIcon}
              style={{
                width: "40px",
                left: "30px",
                position: "absolute",
                top: "830px",
              }}
            />
          </li>
        </ul>
      </div>
      <div class="sidebar sidebar-right">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderBottom: "1px solid #FFF",
          }}
        >
          <h2
            style={{
              marginLeft: "10px",
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Mensagens
          </h2>
          <div
            style={{
              borderRadius: "100%",
              backgroundColor: "#c9c7c7",
              padding: "7px",
            }}
          >
            {qtdMensagens}
          </div>
        </div>
        <ul>
          <li>
            <SearchBar onSearch={handleSearch} />
          </li>
          <li>
            <CardChat />
          </li>
        </ul>
      </div>
      <ChatRoom />S
    </div>
  );
};

export default Sidebar;
