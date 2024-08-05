import React, { useState } from "react";
import Sidebar from "../Sidebar";
import SidebarSettings from "../MenuSidebar/SidebarSettings";
import lazin from "../../assets/lazin.png";

import "./style.css";
export const EditProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    address: "",
    contact: "",
    city: "",
    state: "AC", // Estado padrão (Acre)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log("Dados do formulário:", formData);
  };
  return (
    <div>
      <Sidebar />
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
            src={lazin}
            style={{ width: "60px", height: "60px", borderRadius: "100%" }}
          />
        </div>
        <form className="form-container1" onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{ display: "flex", gap: "217px" }}>
              <label htmlFor="first_name">Primeiro Nome</label>
              <label htmlFor="last_name">Último Nome</label>
            </div>

            <div className="formdiv1">
              <input
                className="input1"
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
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
                <option value="AC">Acre</option>
                {/* Opções dos outros estados */}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn-submit"
            style={{ color: "white", background: "#615EF0" }}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="btn-submit"
            style={{
              color: "#615EF0",
              background: "white",
              marginLeft: "10px",
              border: "1px solid #615EF0",
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};
