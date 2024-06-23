import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/auth";

import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import personIcon from "../../assets/personIcon.svg";
import ajudaIcon from "../../assets/ajuda.png";
import senhaIcon from "../../assets/senha.svg";

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setformData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleFirebaseSignUp = async () => {
    const { email, password } = formData;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert("Usuário cadastrado com sucesso!");
      setformData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFirebaseSignUp();
  };

  return (
    <div className="container">
      <div className="form-container">
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
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="input-container">
              <img
                src={personIcon}
                alt="Ícone de Email"
                className="input-icon"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <img src={senhaIcon} className="input-icon1" />
              <input
                type="password"
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </div>
            <div className="checkbox-container">
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
        alt="Ícone de Ajuda"
      />
    </div>
  );
}
