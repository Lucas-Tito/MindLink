import admin from "../db/connection.js"


const userPatientCreator = {

    createUser: async (request, response) => {
        console.log("Create UserPatient");
        const user = {
            email: request.body.email,
            name: request.body.name,
            password: request.body.password
          };
        
        try { 
            const docRef = await admin
                .firestore()
                .collection("UsersPatient")
                .add(user);
            
            response.json({status: "Usuário criado com su sexo!", userId: docRef.id})
        } catch (error) {
            response.json({status: "Deu errado viu!?", Message: error})
        }  
        

            response.json(response.snapshot);
    }
}


function parseUserPatientFromJSON(jsonData) {
    const { name, email, senha } = JSON.parse(jsonData);
    return new UserPatientModel(name, email, senha);
}


export default userPatientCreator