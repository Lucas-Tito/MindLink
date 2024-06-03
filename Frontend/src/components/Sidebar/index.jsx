import React, { useState } from "react";
import "./style.css";

import homeIcon from "../../assets/home.svg";
import chatIcon from "../../assets/chatIcon.svg";
import logoIcon from "../../assets/Logo.svg";
import lupaIcon from "../../assets/lupaIcon.svg";
import engineIcon from "../../assets/engine.svg";
import cerebroIcon from "../../assets/cerebro.png";
import Sidebar2 from "../Sidebar2";

const Sidebar = () => {
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
                top: "630px",
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
