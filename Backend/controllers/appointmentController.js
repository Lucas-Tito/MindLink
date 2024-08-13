import admin from "../db/connection.js";

const appointmentController = {
  getAllAppointments: async (request, response) => {
    console.log("Get All Appointments");

    admin
      .firestore()
      .collection("Appointments")
      .get()
      .then((snapshot) => {
        const appointments = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
        response.json(appointments);
      });
  },

  getAppointmentById: async (request, response) => {
    console.log("Get Appointment by Id");
    console.log(request.params);
    const appointmentSelected = await admin
      .firestore()
      .collection("Appointments")
      .doc(request.params.id)
      .get();
    console.log(appointmentSelected);
    response.json(appointmentSelected.data());
  },

  createAppointment: async (request, response) => {
    console.log("Create Appointment");
    const appointment = {
      patientName: request.body.patientName,
      patientId: request.body.patientId,
      professionalName: request.body.professionalName,
      professionalId: request.body.professionalId,
      appointmentDate: request.body.appointmentDate,
    };

    try {
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const weekDayValue = new Date(
        appointment.appointmentDate.year,
        appointment.appointmentDate.month - 1,
        appointment.appointmentDate.day
      ).getDay();
      const appointmentDateTime = new Date(
        appointment.appointmentDate.year,
        appointment.appointmentDate.month - 1, // Mês começa do zero em JavaScript
        appointment.appointmentDate.day,
        appointment.appointmentDate.hour,
        appointment.appointmentDate.minutes,
        appointment.appointmentDate.seconds
      );

      //verificação da disponibilidade
      console.log(dayNames[weekDayValue]);
      const availabilityQuery = await admin
        .firestore()
        .collection("Availability")
        .where("professionalId", "==", appointment.professionalId)
        .where("dayOfWeek", "==", dayNames[weekDayValue])
        .get();

      //verifica se o dia está dentro da disponibilidade
      if (availabilityQuery.empty) {
        return response
          .status(400)
          .json({
            status: "Erro",
            message: "Não há disponibilidade para o profissional neste dia.",
          }); //seguir esse padrão de responses
      }

      const availability = availabilityQuery.docs[0].data();
      const availabilityStartTime = new Date(appointmentDateTime);
      const availabilityEndTime = new Date(appointmentDateTime);

      availabilityStartTime.setHours(
        availability.startHour,
        availability.startMinute,
        0
      );
      availabilityEndTime.setHours(
        availability.endHour,
        availability.endMinute,
        0
      );

      // verifica se  a hora esta dentro da disponibilidade
      if (
        appointmentDateTime < availabilityStartTime ||
        appointmentDateTime > availabilityEndTime
      ) {
        return response
          .status(400)
          .json({
            status: "Erro",
            message:
              "O horário da consulta está fora da disponibilidade do profissional.",
          });
      }

      //verifica outras consultas marcadas
      const appointmentConflictQuery = await admin
        .firestore()
        .collection("Appointments")
        .where("professionalId", "==", appointment.professionalId)
        .where("appointmentDate.year", "==", appointment.appointmentDate.year)
        .where("appointmentDate.month", "==", appointment.appointmentDate.month)
        .where("appointmentDate.day", "==", appointment.appointmentDate.day)
        .where("appointmentDate.hour", "==", appointment.appointmentDate.hour)
        .where(
          "appointmentDate.minutes",
          "==",
          appointment.appointmentDate.minutes
        )
        .get();

      if (!appointmentConflictQuery.empty) {
        return response.status(400).json({
          status: "Erro",
          message:
            "Já existe uma consulta marcada para este horário com este profissional.",
        });
      }

      // caso não houver conflitos
      const docRef = await admin
        .firestore()
        .collection("Appointments")
        .add(appointment);

      response.json({
        status: "Consulta criada com sucesso!",
        appointmentId: docRef.id,
      });
    } catch (error) {
      response.json({ status: "Erro ao criar consulta", message: error.stack });
    }
  },
};

export default appointmentController;
