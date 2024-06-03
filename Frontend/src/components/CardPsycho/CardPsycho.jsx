import React from "react";
import "./card_psycho.css";
import car from "../../assets/pfp/suprisedCar.png"

export default function CardPsycho(){

    return (
        <div className="cardPsycho">
            <img src={car} />
            <div className="cardPsychoHeader">
                <span className="title">Lucas Tito da Silva</span>
                <span className="subtitle">Psicólogo Social</span>
            </div>

            <span className="cardPsychoDesc">Formado na Universidade Federal do Ceará.</span>

            <button className="cardPsychoBtn">Agendar Consulta</button>
        </div>
    )

}
