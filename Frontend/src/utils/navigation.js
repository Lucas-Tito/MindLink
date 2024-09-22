import Calendar from "../components/Calendar/Calendar";
import ChatRoom from "../components/Chat/ChatRoom";
import { Home } from "../components/Home/Home";
import Login from "../components/Login/login";
import SchedulingCalendar from "../components/Scheduling/SchedulingCalendar";

export const navigation = [
  { path: "/", name: "Home", element: <Home />, isPrivate: true, isProfessionalFlow: false },

  //this screen shows when you click on a card of an professional
  {
    path: "/professionalProfile",
    name: "Professional Profile",
    element: <SchedulingCalendar />,
    isPrivate: true,
    isProfessionalFlow: false
  },
  { path: "/login", name: "Login", element: <Login />, isPrivate: false, isProfessionalFlow: false },
  { path: "/chat", name: "Chat", element: <ChatRoom />, isPrivate: true, isProfessionalFlow: false },

  //this is the calendar that shows the sessions a professional has shceduled
  {
    path: "/psychCalendar",
    name: "Psychologist Calendar",
    element: <Calendar />,
    isPrivate: true,
    isProfessionalFlow: true
  },
];
