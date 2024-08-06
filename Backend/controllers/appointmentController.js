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
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
      professionalType: request.body.professionalType,
      photoURL: request.body.photoURL,
    };

    try {
      const docRef = await admin.firestore().collection("Appointments").add(appointment);

      response.json({
        status: "Consulta criada com sucesso!",
        appointmentId: docRef.id,
      });
    } catch (error) {
      response.json({ status: "Erro ao criar consulta", message: error });
    }
  },
};

export default appointmentController;
