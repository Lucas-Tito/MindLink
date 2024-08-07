import { Home } from "../components/Home/Home";
import Login from "../components/Login/login";

export const navigation = [
    {path:"/", name:"Home", element: <Home/>, isPrivate:true},
    {path:"/login", name:"Login", element:<Login/>, isPrivate:false}
]