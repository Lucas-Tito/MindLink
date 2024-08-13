import React, { useState, useEffect } from "react";
import "./scheduling_calendar.css";
import arrow_left_icon from "../../assets/arrow_left.svg";
import arrow_right_icon from "../../assets/arrow_right.svg";

export default function SchedulingCalendar() {
  const [appointmentDate, setAppointmentDate] = useState({
    year: null,
    month: null,
    day: null,
    hour: null,
    minutes: null,
    seconds: 0,
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [professionalName, setProfessionalName] = useState("Dr. Smith"); // Mockado
  const [professionalId, setProfessionalId] = useState(); // Mockado
  const [shouldSendAppointment, setShouldSendAppointment] = useState(false); // Novo estado para controlar o envio
  const user = "2WRBFGbLRaWHnXmMQ9Tmf68gx2v2"; // Substitua pelo ID do usuário real se necessário

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

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      // Simulando uma chamada à API para obter horários disponíveis
      setAvailableTimes(["14:00", "15:00", "18:00"]);
    };

    fetchAvailableTimes();
  }, []);

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
                professionalId: professionalId,
                professionalName: professionalName,
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
        } catch (error) {
          console.error("Error sending appointment data:", error);
        }
      };

      sendAppointmentData();
      setShouldSendAppointment(false); // Resetar o estado após o envio
    }
  }, [shouldSendAppointment]);

  const handleTimeClick = (time) => {
    const selectedDate = "2024-08-14"; // Mockado para testes

    setAppointmentDate({
      year: "2024",
      month: "08",
      day: "12",
      hour: time.split(":")[0], // Hora extraída do formato HH:MM
      minutes: time.split(":")[1], // Minutos extraídos do formato HH:MM
      seconds: 0,
    });
    setProfessionalId("8120938");
    setShouldSendAppointment(true); // Definir o estado para enviar a consulta
  };

  return (
    <div className="scheduling_calendar">
      <div className="datepicker">
        <div className="datepicker-top">
          <div className="month-selector">
            <button className="arrow">
              <img src={arrow_left_icon} alt="Previous Month" />
            </button>
            <span className="month-name">December 2020</span>
            <button className="arrow">
              <img src={arrow_right_icon} alt="Next Month" />
            </button>
          </div>
        </div>
        <div className="datepicker-calendar">
          <span className="day">Mo</span>
          <span className="day">Tu</span>
          <span className="day">We</span>
          <span className="day">Th</span>
          <span className="day">Fr</span>
          <span className="day">Sa</span>
          <span className="day">Su</span>
          <button className="date faded">30</button>
          <button className="date">1</button>
          <button className="date">2</button>
          <button className="date">3</button>
          <button className="date">4</button>
          <button className="date">5</button>
          <button className="date">6</button>
          <button className="date">7</button>
          <button className="date">8</button>
          <button className="date current-day">9</button>
          <button className="date">10</button>
          <button className="date">11</button>
          <button className="date">12</button>
          <button className="date">13</button>
          <button className="date">14</button>
          <button className="date">15</button>
          <button className="date">16</button>
          <button className="date">17</button>
          <button className="date">18</button>
          <button className="date">19</button>
          <button className="date">20</button>
          <button className="date">21</button>
          <button className="date">22</button>
          <button className="date">23</button>
          <button className="date">24</button>
          <button className="date">25</button>
          <button className="date">26</button>
          <button className="date">27</button>
          <button className="date">28</button>
          <button className="date">29</button>
          <button className="date">30</button>
          <button className="date">31</button>
          <button className="date faded">1</button>
          <button className="date faded">2</button>
          <button className="date faded">3</button>
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
