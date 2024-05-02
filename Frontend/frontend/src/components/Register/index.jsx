import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import personIcon from "../../assets/personIcon.svg";
import ajudaIcon from "../../assets/ajuda.png";
import senhaIcon from "../../assets/senha.svg";

export default function Register() {
  // Definindo os estados para os campos do formulário
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleFormChange(event) {
    //gets data from the input that triggered and event
    const { name, value } = event.target;

    //keeps the unchenged data and updates the one that changed
    setformData((previousFormData) => {
      return {
        ...previousFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    //cancel the default submit event that refreshes the browser
    event.preventDefault();

    //Todo* inputs null verification and verification if user already exists

    fetch("http://localhost:3000/mindlink/users", {
      method: "POST",
      headers: {
        //indicates that the body contais json data
        "Content-type": "application/json",
      },
      //sends the data to the API process
      body: JSON.stringify(formData),

      //awaits the response from the API
    })
      .then((resp) => resp.json())
      .then((data) => {
        const msg = data.msg;
        if (msg == "exists") {
          alert("Usuário já existe!");
        } else if (msg == "success") {
          alert("Usuário registrado com sucesso!");
        }
      })
      .catch((err) => console.log(err));
    setformData({
      name: "",
      email: "",
      password: "",
    });
  }
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
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div class="input-container">
              <img src={personIcon} alt="Ícone de Email" class="input-icon" />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <img src={senhaIcon} class="input-icon1" />

              <input
                type="password"
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
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
