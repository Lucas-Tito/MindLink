import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import CardChat from "./components/CardChat";
import { EditProfile } from "./components/Edit";
import CardPsycho from "./components/CardPsycho/CardPsycho";
import Scheduling from "./components/Scheduling";
import ChatRoom from "./components/Chat";
import { Login } from "./components/Login/login";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;