import { createContext, useContext, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import RenderRoutes from "./RenderRoutes"
import firebase from "firebase/compat/app";
import Login from "../components/Login/login";

export const AuthContext = createContext()

export default function ProtectedRoutes(){

    const [user, setUser] = useState({name:"", isAuthenticated:false})
    const auth = firebase.auth();
    
    const loginFunction = async (login, password) => {
        try {
          await auth.signInWithEmailAndPassword(login, password);
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