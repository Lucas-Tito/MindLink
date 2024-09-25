import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../assets/home.svg";
import chatIcon from "../../assets/chatIcon.svg";
import notificationIcon from "../../assets/notificationIcon.svg";
import engineIcon from "../../assets/engine.svg";
import cerebroIcon from "../../assets/cerebro.png";
import firebase from "firebase/compat/app";
import "./style.css";

const MenuSidebar = ({ notificationCount }) => {
  const navigate = useNavigate();
  const [isProfessional, setIsProfessional] = useState(false);

  useEffect(() => {
    const checkIsProfessional = async () => {
      const auth = firebase.auth();
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const response = await fetch(
          `http://localhost:3000/mindlink/users/checkIfIsProfessional/${userId}`
        );
        const data = await response.json();
        setIsProfessional(data.isProfessional);
      }
    };

    checkIsProfessional();
  }, []);

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
          {/* Renderizar condicionalmente se o usuário for profissional */}
          {isProfessional && (
            <li>
              <div className="notification-container">
                <img
                  src={notificationIcon}
                  className="notification-icon"
                  onClick={() => navigate("/notificationPsycho")}
                />
                {notificationCount > 0 && (
                  <span className="notification-badge">
                    {notificationCount}
                  </span>
                )}
              </div>
            </li>
          )}
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
