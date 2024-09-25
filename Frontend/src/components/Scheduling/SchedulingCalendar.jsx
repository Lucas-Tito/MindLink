import React, { useState, useEffect } from "react";
import "./scheduling_calendar.css";
import arrow_left_icon from "../../assets/arrow_left.svg";
import arrow_right_icon from "../../assets/arrow_right.svg";
import { useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";
import MenuSidebar from "../MenuSidebar/MenuSidebar";

export default function SchedulingCalendar() {
  const auth = firebase.auth();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [shouldSendAppointment, setShouldSendAppointment] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const location = useLocation();
  const [professional, setProfessional] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState({
    year: null,
    month: null,
    day: null,
    hour: null,
    minutes: null,
    seconds: 0,
  });
  const user = auth.currentUser.uid;

  useEffect(() => {
    if (location.state) {
      setProfessional(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/mindlink/users/${user}`
        );
        const data = await response.json();
        setPatientName(data.name);
        setPatientId(data.uid);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [user]);

  const [highlightedDays, setHighlightedDays] = useState(new Set());

  useEffect(() => {
    const fetchAvailableDays = async () => {
      try {
        if (!professional) return;
        const professionalId = professional.uid;

        const availabilityRef = firebase.firestore().collection("Availability");
        const snapshot = await availabilityRef
          .where("professionalId", "==", professionalId)
          .get();

        if (!snapshot.empty) {
          const daysSet = new Set();
          snapshot.forEach((doc) => {
            const { dayOfWeek } = doc.data();
            daysSet.add(dayOfWeek);
          });
          setHighlightedDays(daysSet);
        } else {
          setHighlightedDays(new Set());
        }
      } catch (error) {
        console.error("Error fetching available days:", error);
      }
    };

    if (professional) {
      fetchAvailableDays();
    }
  }, [professional]);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        if (!professional) return;
        const professionalId = professional.uid;

        const availabilityRef = firebase.firestore().collection("Availability");
        const snapshot = await availabilityRef
          .where("professionalId", "==", professionalId)
          .get();

        if (!snapshot.empty) {
          const times = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const { startHour, startMinute } = data.startTime;
            times.push(
              `${startHour.padStart(2, "0")}:${startMinute.padStart(2, "0")}`
            );
          });
          setAvailableTimes(times);
          console.log("Horários disponíveis: ", times);
        } else {
          setAvailableTimes([]);
          console.log("No available times found.");
        }
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
    };

    if (professional) {
      fetchAvailableTimes();
    }
  }, [professional]);

  useEffect(() => {
    if (shouldSendAppointment) {
      const sendAppointmentData = async () => {
        try {
          console.log("Enviando dados do agendamento:", {
            patientId,
            patientName,
            professionalId: professional.uid,
            appointmentDate,
          });

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

          // Criar a conexão do usuário após o agendamento
          await createUserConnection(patientId, professional.uid);

          alert("Consulta agendada com sucesso!");
        } catch (error) {
          console.error("Error sending appointment data:", error);
          alert("Falha ao agendar consulta. Tente novamente.");
        } finally {
          setShouldSendAppointment(false); // Resetar o estado após o envio
        }
      };

      sendAppointmentData();
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
            ConnectionDate: new Date().toISOString(),
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
      alert("Falha ao criar conexão. Tente novamente.");
    }
  };

  const handleTimeClick = (time) => {
    setAppointmentDate({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: appointmentDate.day,
      hour: time.split(":")[0],
      minutes: time.split(":")[1],
      seconds: 0,
    });
    setShouldSendAppointment(true);
  };

  const handleDateClick = (day) => {
    setAppointmentDate({
      ...appointmentDate,
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: day,
    });
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

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

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <>
      <MenuSidebar />
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
            {getDaysInMonth().map((day, index) => {
              const dayOfWeek = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              ).toLocaleString("en-US", { weekday: "long" });
              const isHighlighted = highlightedDays.has(dayOfWeek);
              return (
                <button
                  key={index}
                  className={`date ${
                    day === appointmentDate.day ? "selected-day" : ""
                  } ${isHighlighted ? "highlighted-day" : ""}`}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day || ""}
                </button>
              );
            })}
          </div>
        </div>

        <div className="available_times">
          <span>Horários disponíveis</span>
          <div>
            {availableTimes.length > 0 ? (
              availableTimes.map((time, index) => (
                <button key={index} onClick={() => handleTimeClick(time)}>
                  {time}
                </button>
              ))
            ) : (
              <p>Nenhum horário disponível.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
