import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/ProtectedRoutes";
import MenuSidebar from "../MenuSidebar/MenuSidebar";
import CardPsycho from "../CardPsycho/CardPsycho";
import Calendar from "../Calendar/Calendar";

export const Home = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <MenuSidebar />
      {user.isProfessional? 
        <Calendar/>
        : <CardPsycho />}
      
    </>
  );
};
