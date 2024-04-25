import admin from "../db/connection.js"

const userPatientSelector = {
    getAllUsers: async (request,response) => {
        console.log("Get All UsersPatient");

        admin
            .firestore()
            .collection("UsersPatient")
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
        const userSelected = await admin.firestore().collection("UsersPatient").doc(request.params.id).get();
        console.log(userSelected);
        response.json(userSelected.data());
    }
}


export default userPatientSelector