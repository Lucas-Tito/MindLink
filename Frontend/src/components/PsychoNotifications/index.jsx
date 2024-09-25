import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase"; // Ajuste o caminho de acordo com sua estrutura
import firebase from "firebase/compat/app";
import MenuSidebar from "../MenuSidebar/MenuSidebar"; // Ajuste o caminho conforme necessário
import "./style.css"; // Importar o CSS para estilização

const PsychologistNotifications = () => {
  const auth = firebase.auth();
  const [notifications, setNotifications] = useState([]);
  const currentUserId = auth.currentUser?.uid; // ID do usuário atual

  useEffect(() => {
    if (!currentUserId) {
      console.error("User ID is not defined");
      return; // Não executa a busca se o ID do usuário não estiver definido
    }

    // Usar onSnapshot para ouvir mudanças na coleção
    const unsubscribe = firestore
      .collection("Appointments")
      .where("professionalId", "==", currentUserId)
      .onSnapshot((snapshot) => {
        const notificationsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsArray);
      });

    // Cleanup function para cancelar a inscrição quando o componente é desmontado
    return () => unsubscribe();
  }, [currentUserId]);

  const formatAppointmentDate = (appointmentDate) => {
    const { day, month, year, hour, minutes } = appointmentDate;
    return `${day}/${month}/${year} às ${hour}:${minutes}`;
  };

  const handleAccept = (id) => {
    // Aqui você pode adicionar a lógica para aceitar a reserva
    alert(`Reserva com ID ${id} aceita.`);
    // Você pode implementar a lógica adicional aqui, como atualizar o estado ou notificar o usuário.
  };

  const handleReject = async (id) => {
    // Remover a reserva da coleção "Appointments"
    try {
      await firestore.collection("Appointments").doc(id).delete();
      console.log(`Reserva com ID ${id} recusada.`);
    } catch (error) {
      console.error("Erro ao recusar a reserva: ", error);
    }
  };

  return (
    <div className="notifications-container">
      <MenuSidebar notificationCount={notifications.length} />{" "}
      {/* Passando o número de notificações */}
      <div className="notifications">
        <h2>Notificações de Reservas</h2>
        {notifications?.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <p>Paciente: {notification.patientName}</p>
                <p>
                  Data da Reserva:{" "}
                  {formatAppointmentDate(notification.appointmentDate)}
                </p>
                <button
                  className="accept-button"
                  onClick={() => handleAccept(notification.id)}
                >
                  Aceitar
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(notification.id)}
                >
                  Recusar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há novas reservas.</p>
        )}
      </div>
    </div>
  );
};

export default PsychologistNotifications;
