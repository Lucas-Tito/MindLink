import React, { useState } from "react";
import "./style.css";
import editIcon from "../../assets/editIcon.svg";
import notificationIcon from "../../assets/notificationIcon.svg";
import helpIcon from "../../assets/helpIcon.svg";

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
          <div style={{ display: "flex" }}>
            <img src={editIcon} className="img" />
            <li style={{ fontSize: "20px", fontWeight: "bold" }}>
              Edit profile
            </li>
          </div>
          <div style={{ display: "flex" }}>
            <img
              src={notificationIcon}
              style={{ fontSize: "20px" }}
              className="img"
            />
            <li>Notification</li>
          </div>
          <div style={{ display: "flex" }}>
            <img src={helpIcon} style={{ fontSize: "20px" }} className="img" />
            <li>Help</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SidebarSettings;
