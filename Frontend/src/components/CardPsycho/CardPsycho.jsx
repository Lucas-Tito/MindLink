import React, { useState, useEffect } from "react";
import "./card_psycho.css";
import car from "../../assets/pfp/suprisedCar.png";
import { Link, useNavigate } from "react-router-dom";

export default function CardPsycho() {
  const [professionals, setProfessionals] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  // useEffect para buscar os profissionais na API
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/mindlink/professionalUsers"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProfessionals(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchProfessionals();
  }, []);

  const navigate = useNavigate();
  function handleSubmit(professional) {
    navigate("/professionalProfile", { state: { data: professional } });
  }

  // Filtra os profissionais com base no termo de busca
  const filteredProfessionals = professionals.filter((psycho) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      psycho.name?.toLowerCase().includes(searchLower) ||
      psycho.last_name?.toLowerCase().includes(searchLower) ||
      psycho.bio?.toLowerCase().includes(searchLower) ||
      psycho.title?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="containerPsycho">
      {/* Campo de busca */}
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Buscar psicólogos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />
      </div>

      {filteredProfessionals.map((psycho, index) => (
        <div key={index} className="cardPsycho">
          <img src={psycho.photoURL} alt={`${psycho.name} profile`} />
          <div className="cardPsychoHeader">
            <span className="title">{psycho.name}</span>
            <span className="subtitle">{psycho.title}</span>
          </div>
          <span className="cardPsychoDesc">{psycho.education}</span>
          <button
            className="cardPsychoBtn"
            onClick={() => handleSubmit(psycho)}
          >
            Agendar Consulta
          </button>
        </div>
      ))}
    </div>
  );
}
