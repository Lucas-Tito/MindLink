import React, { useState, useEffect } from "react";
import "./card_psycho.css";
import car from "../../assets/pfp/suprisedCar.png";
import { Link, useNavigate } from "react-router-dom";

export default function CardPsycho() {
  const [professionals, setProfessionals] = useState([]);

  // useEffect para buscar os profissionais na API
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        // Faz uma requisição GET para a API
        const response = await fetch(
          "http://localhost:3000/mindlink/professionalUsers"
        );

        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();
        // console.log("Dados recebidos da API:", data); // Log dos dados recebidos
        setProfessionals(data); // Atualiza o estado de usuários com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    // Chama a função quando o componente é montado
    fetchProfessionals();
  }, []);

  const navigate = useNavigate();
  function handleSubmit(professional) {
    console.log("rock");
    console.log(professional);

    navigate("/professionalProfile", { state: { data: professional } });
  }

  return (
    <div className="containerPsycho">
      {professionals.map((psycho, index) => (
        <div key={index} className="cardPsycho">
          <img src={psycho.photoURL} alt={`${psycho.name} profile`} />
          <div className="cardPsychoHeader">
            <span className="title">{psycho.name}</span>
            <span className="subtitle">{psycho.title}</span>
          </div>
          <span className="cardPsychoDesc">{psycho.education}</span>
          {/* <Link className="cardPsychoBtn" to="/professionalProfile">
            Agendar Consulta
          </Link> */}
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
