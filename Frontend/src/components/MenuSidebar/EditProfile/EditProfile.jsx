import React, { useState, useEffect } from "react";
import { firestore, storage } from "../../../firebase"; // Importando a configuração do Firebase
import firebase from "firebase/compat/app";
import SidebarSettings from "../SidebarSettings/SidebarSettings";
import "./style.css";
import MenuSidebar from "../MenuSidebar";

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    bio: "",
    address: "",
    contact: "",
    city: "",
    state: "AC", // Estado padrão (Acre)
    title: "", // Campo title
    education: "", // Campo education
  });
  const auth = firebase.auth();
  const [photoURL, setPhotoURL] = useState(null); // Estado para armazenar a foto
  const [photoPreview, setPhotoPreview] = useState(null); // Para pré-visualizar a foto
  const userId = auth.currentUser?.uid; // Obtendo o ID do usuário autenticado
  const user = auth.currentUser; // Obtém o usuário atual

  // Função para buscar os dados do Firestore
  useEffect(() => {
    if (userId) {
      const userRef = firestore.collection("Users").doc(userId); // Ajuste o caminho conforme a sua coleção
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setFormData(doc.data()); // Preenche os campos do formulário com os dados do Firestore
            setPhotoPreview(doc.data().photoURL); // Define a foto de perfil se existir
          } else {
            console.log("Nenhum dado encontrado para esse usuário.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do Firestore:", error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhotoURL(e.target.files[0]); // Define a nova foto selecionada
      setPhotoPreview(URL.createObjectURL(e.target.files[0])); // Atualiza a pré-visualização da foto
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verifica se há uma foto para fazer upload
      let downloadURL = formData.photoURL || null; // Mantém o URL antigo se não houver nova foto

      if (photoURL) {
        // Faz o upload da foto para o Firebase Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child(
          `user-photos/${user.uid}/${photoURL.name}`
        );
        await fileRef.put(photoURL);

        // Obtém a URL de download da foto
        downloadURL = await fileRef.getDownloadURL();

        // Atualiza o perfil do usuário no Firebase Authentication com a foto
        await user.updateProfile({
          photoURL: downloadURL,
        });
      }

      // Atualiza ou cria um documento correspondente no Firestore
      const updatedData = {
        uid: user?.uid,
        name: formData.name || "", // Definindo um valor padrão
        last_name: formData.last_name || "", // Definindo um valor padrão
        email: formData.email || "", // Definindo um valor padrão
        bio: formData.bio || "", // Definindo um valor padrão
        address: formData.address || "", // Definindo um valor padrão
        contact: formData.contact || "", // Definindo um valor padrão
        city: formData.city || "", // Definindo um valor padrão
        state: formData.state || "AC", // Definindo um valor padrão
        title: formData.title || "", // Definindo um valor padrão
        education: formData.education || "", // Definindo um valor padrão
        photoURL: downloadURL, // Armazena a URL de download da foto no Firestore
      };

      await firestore
        .collection("Users")
        .doc(user.uid)
        .set(updatedData, { merge: true });

      console.log("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  };

  return (
    <div>
      <MenuSidebar />
      <SidebarSettings />
      <div className="form1">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "20px",
            width: "500px",
          }}
        >
          <h2>Edit Profile</h2>
          <img
            src={photoPreview || formData.photoURL} // Mostra a pré-visualização ou a foto atual
            style={{ width: "60px", height: "60px", borderRadius: "100%" }}
            alt="Profile"
          />
        </div>
        <form className="form-container1" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="photo">Alterar Foto de Perfil</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", gap: "217px" }}>
              <label htmlFor="name">Primeiro Nome</label>
              <label htmlFor="last_name">Último Nome</label>
            </div>
            <div className="formdiv1">
              <input
                className="input1"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="input1"
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="education">Educação</label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contato</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", gap: "300px" }}>
              <label htmlFor="city">Cidade</label>
              <label htmlFor="state">Estado</label>
            </div>
            <div className="formdiv2">
              <input
                className="input1"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <select
                className="input1"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Selecione um estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>

          <button className="form-button" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
