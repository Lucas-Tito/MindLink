import React, { useState } from "react";
import "./style.css";
import editIcon from "../../assets/editIcon.svg";

const SidebarSettings = () => {
  const handleSearch = (term) => {
    // Aqui você pode fazer algo com o termo de busca, como enviar para um servidor
    console.log("Termo de busca:", term);
  };

  return (
    <div>
      {" "}
      <div class="sidebar sidebar-settings">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            borderBottom: "1px solid #FFF",
          }}
        >
          <h2
            style={{
              marginLeft: "15px",
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Settings
          </h2>
        </div>
        <ul>
          <img src={editIcon} className="img" />
          <li>Edit profile</li>
          <li>Notification</li>
          <li>Help</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarSettings;
