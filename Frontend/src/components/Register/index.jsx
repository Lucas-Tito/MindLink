import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { storage } from "../../firebase";

import "./style.css";
import cerebro_icon from "../../assets/cerebro.png";
import imagem_consulta from "../../assets/imagemConsulta.png";
import personIcon from "../../assets/personIcon.svg";
import ajudaIcon from "../../assets/ajuda.png";
//import senhaIcon from "../../assets/senha.svg";

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    professionalType: false,
    photoURL: null, // Armazena o objeto File da foto selecionada pelo usuário
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked(checked);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      photoURL: file, // Armazena o objeto File da foto selecionada pelo usuário
    }));
  };

  const handleFirebaseSignUp = async () => {
    const { email, password, photoURL } = formData;

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Obtém o usuário atual
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

        // Atualiza o perfil do usuário no Firebase Authentication com a foto
        await user.updateProfile({
          photoURL: downloadURL,
        });

        // Cria um documento correspondente no Firestore
        await firebase.firestore().collection("Users").doc(user.uid).set({
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          professionalType: formData.professionalType,
          photoURL: downloadURL, // Armazena a URL de download da foto no Firestore
        });
      } else {
        // Se não houver foto, apenas cria o documento no Firestore sem a URL de foto
        await firebase.firestore().collection("Users").doc(user.uid).set({
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          professionalType: formData.professionalType,
          // Outros campos necessários
        });
      }

      alert("Usuário cadastrado com sucesso!");

      // Limpa o estado local do formulário após o cadastro
      setFormData({
        name: "",
        email: "",
        password: "",
        professionalType: false,
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

  const handleHelpIconClick = () => {
    // Implemente a lógica para o ícone de ajuda, se necessário
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
};

export default Register;
