import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import CardChat from "./components/CardChat";
import { EditProfile } from "./components/Edit";

function App() {
  return (
    <div className="App">
      <EditProfile />
    </div>
  );
}

export default App;
