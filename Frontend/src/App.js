import logo from "./logo.svg";
import "./App.css";
import SignOut from "./components/Login/SignOut";
import SignIn from "./components/Login/SignIn";
import { auth } from "./firebase"; // Importando auth do arquivo de configuraçãoimport ChatRoom from "./components/Chat/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/Chat/ChatRoom";
import Scheduling from "./components/Scheduling";
<<<<<<< HEAD
=======
import { Home } from "./components/Home/Home";
>>>>>>> 468badf395d3d4b140965bfbaf290163603e32f0

function App() {
  const [user] = useAuthState(auth);

  return (
<<<<<<< HEAD
    <Scheduling/>
=======
    <div className="App">
      <Home />
    </div>
>>>>>>> 468badf395d3d4b140965bfbaf290163603e32f0
  );
}

export default App;
