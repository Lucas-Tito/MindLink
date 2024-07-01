import admin from "../db/connection.js";

const userController = {
  getAllUsers: async (request, response) => {
    console.log("Get All User");

    admin
      .firestore()
      .collection("Users")
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
        response.json(users);
      });
  },

  getUserById: async (request, response) => {
    console.log("Get User by Id");
    console.log(request.params);
    const userSelected = await admin
      .firestore()
      .collection("Users")
      .doc(request.params.id)
      .get();
    console.log(userSelected);
    response.json(userSelected.data());
  },

  createUser: async (request, response) => {
    console.log("Create User");
    const user = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
      professionalType: request.body.professionalType,
      photoURL: request.body.photoURL,
    };

    try {
      const docRef = await admin.firestore().collection("Users").add(user);

      response.json({
        status: "Usuário criado com sucesso!",
        userId: docRef.id,
      });
    } catch (error) {
      response.json({ status: "Erro ao criar usuário", message: error });
    }
  },
};

export default userController;
