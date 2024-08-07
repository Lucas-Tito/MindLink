import { Home } from "../components/Home/Home";
import Login from "../components/Login/login";
import Scheduling from "../components/Scheduling";

export const navigation = [
    {path:"/", name:"Home", element: <Home/>, isPrivate:true},
    {path:"/professionalProfile", name:"Professional Profile", element: <Scheduling/>, isPrivate:true},
    {path:"/login", name:"Login", element:<Login/>, isPrivate:false}
]