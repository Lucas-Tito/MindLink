import React from "react";
import "./card_psycho.css";
import car from "../../assets/pfp/suprisedCar.png";

const psychoData = [
  {
    name: "Lucas Tito da Silva",
    title: "Psicólogo Social",
    education: "Formado na Universidade Federal do Ceará.",
    image: car,
  },
  {
    name: "Lázaro Junior",
    title: "Psicólogo Criminal",
    education: "Formado na Universidade Federal do Ceará.",
    image: car,
  },
  {
    name: "José Anderson",
    title: "Psicólogo Clínico",
    education: "Formado na Universidade Federal do Ceará.",
    image: car,
  },
];

export default function CardPsycho() {
  return (
    <div className="containerPsycho">
      {psychoData.map((psycho, index) => (
        <div key={index} className="cardPsycho">
          <img src={psycho.image} alt={`${psycho.name} profile`} />
          <div className="cardPsychoHeader">
            <span className="title">{psycho.name}</span>
            <span className="subtitle">{psycho.title}</span>
          </div>
          <span className="cardPsychoDesc">{psycho.education}</span>
          <button className="cardPsychoBtn">Agendar Consulta</button>
        </div>
      ))}
    </div>
  );
}
