import React, { useState } from "react";
import "./style.css";
import CardChat from "../CardChat";
import SearchBar from "../Search";

const Sidebar2 = () => {
  const [qtdMensagens, setQtdMensagens] = useState(12);
  const handleSearch = (term) => {
    // Aqui você pode fazer algo com o termo de busca, como enviar para um servidor
    console.log("Termo de busca:", term);
  };

  return (
    <div>
      {" "}
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
    </div>
  );
};

export default Sidebar2;
