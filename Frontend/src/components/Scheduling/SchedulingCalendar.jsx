import React, { useState, useEffect } from "react";
import "./scheduling_calendar.css";
import arrow_left_icon from "../../assets/arrow_left.svg";
import arrow_right_icon from "../../assets/arrow_right.svg";
import { useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";

export default function SchedulingCalendar() {
  const auth = firebase.auth();
  // Estado para armazenar os horários disponíveis
  const [availableTimes, setAvailableTimes] = useState([]);

  // Estados para armazenar informações do paciente e profissional
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  // Estado para controlar o envio dos dados do agendamento
  const [shouldSendAppointment, setShouldSendAppointment] = useState(false);

  // Estado para gerenciar a data atual usada na navegação do calendário
  const [currentDate, setCurrentDate] = useState(new Date());

  const location = useLocation();
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    if (location.state) {
      setProfessional(location.state.data);
    }
  }, [location.state]);

  // Estado para armazenar a data do agendamento
  const [appointmentDate, setAppointmentDate] = useState({
    year: null,
    month: null,
    day: null,
    hour: null,
    minutes: null,
    seconds: 0,
  });

  const user = auth.currentUser.uid;

  // Efeito para buscar dados do paciente quando o componente é montado
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/mindlink/users/${user}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }
        const data = await response.json();
        setPatientName(data.name);
        setPatientId(data.uid); // Ajuste se necessário
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [user]);

  // Efeito para buscar horários disponíveis quando o componente é montado
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      // Simulando uma chamada à API para obter horários disponíveis
      setAvailableTimes(["14:00", "15:00", "18:00"]);
    };

    fetchAvailableTimes();
  }, []);

  // Efeito para enviar os dados do agendamento quando o estado shouldSendAppointment é true
  useEffect(() => {
    if (shouldSendAppointment) {
      const sendAppointmentData = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/mindlink/appointment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                patientId: patientId,
                patientName: patientName,
                professionalId: professional.uid,
                professionalName: professional.name,
                appointmentDate: appointmentDate,
              }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Network response was not ok: ${response.status} - ${errorText}`
            );
          }

          const data = await response.json();
          console.log("Appointment data sent successfully:", data);

          // Chama a função para criar uma nova conexão após o agendamento
          await createUserConnection(patientId, professional?.uid);

          alert("Consulta agendada com sucesso!"); // Alerta de sucesso
        } catch (error) {
          console.error("Error sending appointment data:", error);
          alert("Falha ao agendar consulta. Tente novamente."); // Alerta de falha
        }
      };

      sendAppointmentData();
      setShouldSendAppointment(false); // Resetar o estado após o envio
    }
  }, [shouldSendAppointment]);

  const createUserConnection = async (patientId, professionalId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/mindlink/usersconnection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PatientId: patientId,
            ProfessionalId: professionalId,
            ConnectionDate: new Date().toISOString(), // ou outra data se necessário
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("User connection created successfully:", data);
    } catch (error) {
      console.error("Error creating user connection:", error);
      alert("Falha ao criar conexão. Tente novamente."); // Alerta de falha
    }
  };

  // Função chamada quando um horário é clicado
  const handleTimeClick = (time) => {
    setAppointmentDate({
      year: currentDate.getFullYear(), // Define o ano atual
      month: currentDate.getMonth() + 1, // Define o mês atual (0-indexado, por isso +1)
      day: appointmentDate.day, // Mantém o dia selecionado anteriormente
      hour: time.split(":")[0], // Hora extraída do formato HH:MM
      minutes: time.split(":")[1], // Minutos extraídos do formato HH:MM
      seconds: 0, // Segundos definidos como 0
    });
    setShouldSendAppointment(true); // Definir o estado para enviar a consulta
  };

  // Função chamada quando um dia é clicado no calendário
  const handleDateClick = (day) => {
    setAppointmentDate({
      ...appointmentDate,
      year: currentDate.getFullYear(), // Define o ano atual
      month: currentDate.getMonth() + 1, // Define o mês atual (0-indexado, por isso +1)
      day: day, // Atualiza o dia selecionado
    });
  };

  // Função para alterar o mês exibido no calendário
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction); // Adiciona ou subtrai 1 mês
    setCurrentDate(newDate); // Atualiza o estado com a nova data
  };

  // Função para gerar os dias do mês atual
  const getDaysInMonth = () => {
    const days = [];
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // Adiciona dias em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // Adiciona os dias do mês
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="scheduling_calendar">
      <div className="datepicker">
        <div className="datepicker-top">
          <div className="month-selector">
            <button className="arrow" onClick={() => handleMonthChange(-1)}>
              <img src={arrow_left_icon} alt="Previous Month" />
            </button>
            <span className="month-name">
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </span>
            <button className="arrow" onClick={() => handleMonthChange(1)}>
              <img src={arrow_right_icon} alt="Next Month" />
            </button>
          </div>
        </div>
        <div className="datepicker-calendar">
          <span className="day">Su</span>
          <span className="day">Mo</span>
          <span className="day">Tu</span>
          <span className="day">We</span>
          <span className="day">Th</span>
          <span className="day">Fr</span>
          <span className="day">Sa</span>
          {getDaysInMonth().map((day, index) => (
            <button
              key={index}
              className={`date ${
                day === appointmentDate.day ? "selected-day" : ""
              }`}
              onClick={() => day && handleDateClick(day)}
            >
              {day || ""}
            </button>
          ))}
        </div>
      </div>

      <div className="available_times">
        <span>Horários disponíveis</span>
        <div>
          {availableTimes.map((time, index) => (
            <button key={index} onClick={() => handleTimeClick(time)}>
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
