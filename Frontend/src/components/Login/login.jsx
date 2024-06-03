import React, { useState } from "react";
import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import personIcon from "../../assets/personIcon.svg";
import ajudaIcon from "../../assets/ajuda.png";
import senhaIcon from "../../assets/senha.svg";
//TU PRECISA DO ID PRA COLOCAR NO CAMPO DO OBJETO MENSAGEM E IDETIFICAR O CABRA
//FAZER UM DOS CODIGOS DE CHAT (AGORA SEM O AUTH DO GOOGLE)
//A IDEIA É PEGAR O ID DO PSICOLOGO E CRIAR A ROOM COM ESSE ID
//AINDA NÃO SEI COMO FAZER VARIOS CHATS INTEGRANDO O SIDEBAR
export const Login = () => {
  const [formData, setformData] = useState({
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

    fetch("http://localhost:3000/mindlink/users/login", {
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
        console.log(data.id);
        const msg = data.msg;
        if (msg == "exists") {
          alert("Usuário já existe!");
        } else if (msg == "success") {
          alert("Usuário registrado com sucesso!");
        }
      })
      .catch((err) => console.log(err));
    setformData({
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
              <img src={senhaIcon} class="input-icon2" />

              <input
                type="password"
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </div>

            <button type="submit" className="btn1">
              ENTRAR
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
};
