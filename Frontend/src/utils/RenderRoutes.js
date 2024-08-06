import { Route, Routes } from "react-router-dom";
import { AuthData } from "./ProtectedRoutes";
import { navigation } from "./navigation";

export default function RenderRoutes() {
    const {user} = AuthData()

    return(
        <Routes>
            {navigation.map((route, i) => {
                if(route.isPrivate && user.isAuthenticated){
                    return <Route key={i} path={route.path} element={route.element}/>
                } 
                else if(!route.isPrivate){
                    return <Route key={i} path={route.path} element={route.element}/>
                }
                else return false
            })}
        </Routes>
    )
}