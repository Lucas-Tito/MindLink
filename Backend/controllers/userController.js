import admin from "../db/connection.js"

const userController = {
    create: async (request, response) => {
        console.log("Create User");

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
    }
}

export default userController