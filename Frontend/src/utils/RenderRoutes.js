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
          if (route.isPrivate) {
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
          } else {
            return <Route key={i} path={route.path} element={route.element} />;
          }
        })}
      </Routes>
    )
}