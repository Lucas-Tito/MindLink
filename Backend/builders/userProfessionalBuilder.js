import admin from "../db/connection.js"

const userProfessionalCreator = {

    createUser: async (request, response) => {
        console.log("Create UserProfessional");
        const user = {
            email: request.body.email,
            name: request.body.name,
            password: request.body.password,
            crp: request.body.crp,
            professionalDoc: request.body.professionalDoc
            
          };

        try {
            const docRef = await admin
                .firestore()
                .collection("UsersProfessional")
                .add(user);
            
            response.json({status: "Usuário criado com su sexo!", userId: docRef.id})
        } catch (error) {
            response.json({status: "Deu errado viu!?", Message: error})
        }  
        

            response.json(response.snapshot);
    }
}


export default userProfessionalCreator