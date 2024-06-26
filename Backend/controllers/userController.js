import admin from "../db/connection.js"

const userController = {
    getAllUsers: async (request,response) => {
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
        const userSelected = await admin.firestore().collection("Users").doc(request.params.id).get();
        console.log(userSelected);
        response.json(userSelected.data());
    },

    

    createUser: async (request, response) => {
        console.log("Create User");
        const user = {
            email: request.body.email,
            name: request.body.name,
            password: request.body.password,
            professionalType: request.body.professionalType
          };

        try {
            const docRef = await admin
                .firestore()
                .collection("Users")
                .add(user);
            
            response.json({status: "Usuário criado com su sexo!", userId: docRef.id})
        } catch (error) {
            response.json({status: "Deu errado viu!?", Message: error})
        }  
        

            response.json(response.snapshot);
    }
}


export default userController