import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { storage } from "../../firebase";

import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import personIcon from "../../assets/personIcon.svg";
import ajudaIcon from "../../assets/ajuda.png";
import senhaIcon from "../../assets/senha.svg";

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    professionalType: false,
    photoURL: null, // Adiciona o estado para armazenar a URL da foto
  });

  //const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked(checked);
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: checked,
    }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((previousFormData) => ({
      ...previousFormData,
      photoURL: file,
    }));
  };

  const handleFirebaseSignUp = async () => {
    const { email, password, photoURL } = formData;
    try {
      // Realiza o cadastro do usuário com email e senha
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Verifica se há uma foto para fazer upload
      if (photoURL) {
        // Faz o upload da foto para o Firebase Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child(
          `user-photos/${user.uid}/${photoURL.name}`
        );
        await fileRef.put(photoURL);

        // Obtém a URL de download da foto
        const downloadURL = await fileRef.getDownloadURL();

        // Atualiza formData com a URL de download
        const updatedFormData = {
          ...formData,
          photoURL: downloadURL,
        };

        setFormData(updatedFormData); // Atualiza o estado local com a URL de download

        // Agora, formData contém a photoURL atualizada

        // Após atualizar o estado, chame registerUser() com o formData atualizado
        registerUser(updatedFormData);
      } else {
        // Se não houver foto, apenas chame registerUser() com formData atual
        registerUser(formData);
      }

      alert("Usuário cadastrado com sucesso!");

      // Limpa o estado local do formulário após o cadastro
      setFormData({
        name: "",
        email: "",
        password: "",
        professionalType: "",
        photoURL: null,
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

  const registerUser = (formData) => {
    fetch("http://localhost:3000/mindlink/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Lida com a resposta do backend
        console.log("Success:", data);
      })
      .catch((error) => {
        // Lida com o erro do backend
        console.error("Error:", error);
      });
  };
  const handleHelpIconClick = () => {
    // navigate("/ajuda");
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
            <div className="file-upload">
              <label htmlFor="photo">Escolher Foto:</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={isChecked}
                name="professionalType"
                value={formData.professionalType}
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
        onClick={handleHelpIconClick}
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
        onClick={handleHelpIconClick}
      />
    </div>
  );
}
