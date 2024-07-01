import { auth } from "./firebase"; // Importando auth do arquivo de configuraçãoimport ChatRoom from "./components/Chat/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/Chat/ChatRoom";
import Sidebar2 from "./components/Sidebar2";
import Register from "./components/Register/index";

function App() {
  const [user] = useAuthState(auth);

  return <Sidebar2 />;
}

export default App;
