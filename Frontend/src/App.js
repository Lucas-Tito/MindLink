import logo from "./logo.svg";
import "./App.css";
import SignOut from "./components/Login/SignOut";
import SignIn from "./components/Login/SignIn";
import { auth } from "./firebase"; // Importando auth do arquivo de configuraçãoimport ChatRoom from "./components/Chat/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/Chat/ChatRoom";
import Scheduling from "./components/Scheduling";
import { Home } from "./components/Home/Home";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import SchedulingCalendar from "./components/Scheduling/SchedulingCalendar";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoutes />
      </BrowserRouter>

      {/* <SchedulingCalendar /> */}
      {/* 
      <header>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <Login />}</section> */}
    </div>
  );
}

export default App;
