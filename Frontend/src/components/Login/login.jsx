import React, { useContext, useState } from "react";
import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import ajudaIcon from "../../assets/ajuda.png";
import { AuthContext } from "../../utils/ProtectedRoutes";
import { useNavigate, Link } from "react-router-dom"; // Importa o Link

export default function Login() {
  const { loginFunction } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await loginFunction(email, password);
      console.log("loged");
      navigate("/");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form">
          <div className="title">
            <h2>MindLink</h2>
            <img src={cerebro_icon} alt="logo" className="cerebro_icon" />
          </div>
          <div className="input-container">
            <input
              className="input-email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              className="input-password"
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btnLogin" onClick={handleSignIn}>
            ENTRAR
          </button>
          <Link to="/register" className="linkRegister">
            Criar conta?
          </Link>
        </div>
      </div>
      <div className="image-container">
        <img src={imagem_consulta} alt="Imagem" />
      </div>
      <div
        style={{
          position: "absolute",
          top: "85%",
          left: "47.1%",
          width: "60px",
          height: "60px",
          background: "#8F1EA8",
          backgroundImage: `url(${ajudaIcon})`,
          borderRadius: "50% 0 0 50%",
        }}
      ></div>
      <img
        style={{
          position: "absolute",
          top: "85.3%",
          left: "47.7%",
          width: "50px",
          height: "50px",
        }}
        src={ajudaIcon}
        alt="Ícone de Ajuda"
      />
    </div>
  );
}
