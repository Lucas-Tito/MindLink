import { createContext, useContext, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

const AuthContext = createContext()
export const AuthData = () => useContext(AuthContext)

export default function ProtectedRoutes(){

    const [user, setUser] = useState({name:"", isAuthenticated:false})

    function login(userName, password) {
        //...
    }

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
          
        <AuthContext.Provider value={{user, login, logout}}>
             <>
                  <RenderHeader />
                  <RenderMenu />
                  <RenderRoutes />
             </>
             
        </AuthContext.Provider>
   
    )
}