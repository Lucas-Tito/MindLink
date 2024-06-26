import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import CardChat from "./components/CardChat";
import { EditProfile } from "./components/Edit";
import CardPsycho from "./components/CardPsycho/CardPsycho";
import Scheduling from "./components/Scheduling";
import Login from "./components/Login/login";
import Calendar from "./components/Calendar/Calendar";
import SignOut from "./components/Login/SignOut";
import SignIn from "./components/Login/SignIn";
import firebase from "firebase/compat/app";
import { auth } from "./firebase"; // Importando auth do arquivo de configuraçãoimport ChatRoom from "./components/Chat/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/Chat/ChatRoom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
