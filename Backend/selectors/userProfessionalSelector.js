import admin from "../db/connection.js"

const userProfessionalSelector = {
    getAllUsers: async (request,response) => {
        console.log("Get All User Professional");

        admin
            .firestore()
            .collection("UserProfessional")
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
        console.log("Get User Professional by Id");
        console.log(request.params);
        const userSelected = await admin.firestore().collection("UserProfessional").doc(request.params.id).get();
        console.log(userSelected);
        response.json(userSelected.data());
    }
}


export default userProfessionalSelector