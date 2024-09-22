import { createContext, useContext, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import RenderRoutes from "./RenderRoutes"
import firebase from "firebase/compat/app";
import Login from "../components/Login/login";

export const AuthContext = createContext()

export default function ProtectedRoutes(){

    const [user, setUser] = useState({name: "", isAuthenticated: false, isProfessional: false})
    const auth = firebase.auth();
    
    const loginFunction = async (login, password) => {
        try {
          await auth.signInWithEmailAndPassword(login, password);

          const checkIsProfessional = async () => {
            try {
                const userId = auth.currentUser.uid
                const response = await fetch(`http://localhost:3000/mindlink/users/checkIfIsProfessional/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to check if user is professional");
                }
                const data = await response.json();
                
                setUser((prevData)=>{return {
                  ...prevData,
                  isProfessional: data.isProfessional
                }
              });
            } catch (error) {
                console.error("Failed to check if user is professional:", error);
            }
          };
          checkIsProfessional();

          setUser({ name: login, isAuthenticated: true });        

        } catch (error) {
          console.error("Error signing in with email and password:", error);
        }
      };

    function logout(){
        setUser({...user, isAuthenticated:false})
    }
    /**
     * Se o usuário estiver logado, libere o acesso das páginas protegidas.
     * Se não, redirecione para a página de Login.
     */
    // return user ? <Outlet/> : <Navigate to="/login"/>

    
    //No nosso caso dentro do provider estarão o login, o cadastro e esse renderRoutes que seriam as telas protegidas
    return (
          
        <AuthContext.Provider value={{user, loginFunction, logout}}>
             <>
                <RenderRoutes/>
             </>
             
        </AuthContext.Provider>
   
    )
}