import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./ProtectedRoutes";
import { navigation } from "./navigation";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function RenderRoutes() {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    return(
        <Routes>
        {navigation.map((route, i) => {
          /**
           * verifies if the current route of the array is private
           * if it is, it alsos verifies if the user is authenticated
           */

          if (route.isPrivate && !route.isProfessionalFlow) {
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  user && user.isAuthenticated ? (
                    route.element
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          } 
          else if(route.isProfessionalFlow && user.isProfessional){
            return <Route key={i} path={route.path} element={route.element} />;
          }
          else {
            return <Route key={i} path={route.path} element={route.element} />;
          }
        })}
      </Routes>
    )
}