import React, { useState } from "react";
import "./style.css";

import homeIcon from "../../assets/home.svg";
import chatIcon from "../../assets/chatIcon.svg";
import logoIcon from "../../assets/Logo.svg";
import lupaIcon from "../../assets/lupaIcon.svg";
import engineIcon from "../../assets/engine.svg";
import cerebroIcon from "../../assets/cerebro.png";
import { useNavigate } from "react-router-dom";

const MenuSidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="sidebar">
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
              onClick={() => navigate("/")}
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
              onClick={() => navigate("/chat")}
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
              onClick={() => navigate("/psychCalendar")}
            />
          </li>

          <li>
            <img
              src={engineIcon}
              style={{
                width: "40px",
                left: "30px",
                position: "absolute",
                top: "600px",
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuSidebar;
