import React from "react";
import "./style.css";

import homeIcon from "../../assets/home.svg";
import chatIcon from "../../assets/chatIcon.svg";
import logoIcon from "../../assets/Logo.svg";
import notificationIcon from "../../assets/notificationIcon.svg";
import engineIcon from "../../assets/engine.svg";
import cerebroIcon from "../../assets/cerebro.png";
import { useNavigate } from "react-router-dom";

const MenuSidebar = ({ notificationCount }) => {
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
            <div style={{ position: "relative" }}>
              <img
                src={notificationIcon}
                style={{
                  width: "40px",
                  left: "25px",
                  position: "absolute",
                  top: "195px",
                }}
                onClick={() => navigate("/notificationPsycho")}
              />
              {notificationCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "190px",
                    right: "19px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                >
                  {notificationCount}
                </span>
              )}
            </div>
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
              onClick={() => navigate("/editProfile")}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuSidebar;
