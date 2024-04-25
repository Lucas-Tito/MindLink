import React, { useState } from "react";
import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import personIcon from "../../assets/personIcon.svg";
import ajudaIcon from "../../assets/ajuda.png";
import senhaIcon from "../../assets/senha.svg";

export default function Register() {
  // Definindo os estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  return (
    <div class="container">
      <div class="form-container">
        <div className="form">
          <div className="title">
            <h2>MindLink</h2>
            <img src={cerebro_icon} alt="logo" className="cerebro_icon" />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Nome"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div class="input-container">
              <img src={personIcon} alt="Ícone de Email" class="input-icon" />

              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <img src={senhaIcon} class="input-icon1" />

              <input
                type="password"
                placeholder="Senha"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div class="checkbox-container">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label
                className={isChecked ? "checkbox-label2" : "checkbox-label1"}
              >
                Sou um psicólogo
              </label>
            </div>
            <button type="submit" className="btn1">
              CADASTRAR
            </button>
          </form>
        </div>
      </div>
      <div class="image-container">
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
          borderRadius:
            "50% 0 0 50%" /* Apenas a parte esquerda é um semicírculo */,
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
      />
    </div>
  );
}
