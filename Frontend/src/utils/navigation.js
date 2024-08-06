import { Home } from "../components/Home/Home";
import SignIn from "../components/Login/SignIn";

export const navigation = [
    {path:"/", name:"Home", element: <Home/>, isPrivate:true},
    {path:"/login", name:"Login", element:<SignIn/>, isPrivate:false}
]