import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import CardChat from "./components/CardChat";
import { EditProfile } from "./components/Edit";
import CardPsycho from "./components/CardPsycho/CardPsycho";
import Scheduling from "./components/Scheduling";
import ChatRoom from "./components/Chat";

function App() {
  return (
    <div className="App">
      <ChatRoom />
    </div>
  );
}

export default App;
