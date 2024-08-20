import Calendar from "../components/Calendar/Calendar";
import ChatRoom from "../components/Chat/ChatRoom";
import { Home } from "../components/Home/Home";
import Login from "../components/Login/login";
import SchedulingCalendar from "../components/Scheduling/SchedulingCalendar";

export const navigation = [
  { path: "/", name: "Home", element: <Home />, isPrivate: true },
  {
    path: "/professionalProfile",
    name: "Professional Profile",
    element: <SchedulingCalendar />,
    isPrivate: true,
  },
  { path: "/login", name: "Login", element: <Login />, isPrivate: false },
  { path: "/chat", name: "Chat", element: <ChatRoom />, isPrivate: true },
  {
    path: "/psychCalendar",
    name: "Psychologist Calendar",
    element: <Calendar />,
    isPrivate: true,
  },
];
