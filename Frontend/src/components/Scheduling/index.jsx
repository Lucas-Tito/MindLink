import React from "react";
import MenuSidebar from "../MenuSidebar/MenuSidebar";
import lazin from "../../assets/lazin.png";
import "./style.css";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import { useLocation } from 'react-router-dom';

function Scheduling() {
  const location = useLocation();
  const professional = location.state?.professional;
  console.log(location);
  
  console.log(professional);
  // Dias da semana
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  // Dias do mês (supondo que você tenha esses dados)
  // Você pode substituir esses dados por sua lógica de geração de datas
  const diasMes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  return (
    <div>
      <MenuSidebar />
      <ChatSidebar />
      <div className="scheduling">
        <img src={professional.photoURL} />
        <span className="nome">{professional.name}</span>
        <span>Especialidade</span>
        <span>Fortaleza - Ce</span>
        <span>Psicanalista</span>
        <button type="button" className="btn-sche">
          Ver Perfil Completo
        </button>
      </div>
      <hr />

      <div className="scheduling2">
        <span>Horários</span>
        <span>Selecione uma data</span>
        <table>
          <thead>
            <tr>
              {diasSemana.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {diasSemana.map((dia, index) => (
                <td key={index}>
                  {diasMes.map((diaDoMes, index) =>
                    index % 7 === diasSemana.indexOf(dia) ? (
                      <div key={index}>{diaDoMes}</div>
                    ) : null
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scheduling;
