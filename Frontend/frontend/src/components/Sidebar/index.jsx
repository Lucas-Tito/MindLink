import React, { useState } from "react";
import "./style.css";

import homeIcon from "../../assets/home.svg";
import chatIcon from "../../assets/chatIcon.svg";
import logoIcon from "../../assets/Logo.svg";
import lupaIcon from "../../assets/lupaIcon.svg";
import calendarIcon from "../../assets/calendar.svg";
import CardChat from "../CardChat";

const Sidebar = () => {
  const [qtdMensagens, setQtdMensagens] = useState(12);
  return (
    <div>
      <div class="sidebar">
        <ul>
          <li>
            <img
              src={logoIcon}
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
              src={calendarIcon}
              style={{
                width: "40px",
                left: "30px",
                position: "absolute",
                top: "370px",
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
            borderBottom: "1px solid gray",
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
              padding: "5px",
            }}
          >
            {qtdMensagens}
          </div>
        </div>
        <ul>
          <li>
            <CardChat />
          </li>
          <li>
            <a href="#">Página B</a>
          </li>
          <li>
            <a href="#">Página C</a>
          </li>
        </ul>
      </div>

      <div class="content"></div>
    </div>
  );
};

export default Sidebar;
