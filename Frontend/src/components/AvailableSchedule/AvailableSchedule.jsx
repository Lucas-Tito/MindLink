import "./available_schedule.css"
import add_icon from "../../assets/add_icon.svg"
import MenuSidebar from "../MenuSidebar/MenuSidebar"
import ScheduleCard from "./ScheduleCard"
import AddSchedulePopup from "./AddSchedulePopup/AddSchedulePopup"
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react"

export default function AvailableSchedule(){
    const auth = firebase.auth();
    const [availability, setAvailability] = useState([]);
    const [availabilityElements, setAvailabilityElements] = useState([]);

    useEffect(()=>{
        const fetchAvailability = async () =>{
            try{
                const userId = auth.currentUser.uid

                const response = await fetch(
                    `http://localhost:3000/mindlink/availability/${userId}`
                )
                if (!response.ok) {
                    throw new Error("Failed to fetch availability");
                }

                const data = await response.json()
                setAvailability(data)
                console.log(data);
                
            } catch (error) {
                console.error("Error fetching availability:", error);
            }
        }
        fetchAvailability()
    },[])

    useEffect(()=>{
        console.log("availability");
        
        const elements = availability.map((availability) => (
            <ScheduleCard
                key={availability.id} // Coloque uma chave única para cada item
                startTime={availability.startTime}
                endTime={availability.endTime}
                dayOfWeek={availability.dayOfWeek}
            />
        ));
        setAvailabilityElements(elements);
        
    },[availability])

    return(
        
        <div className="available_schedule">
            <MenuSidebar/>
            <h1>Horários de Atendimento</h1>

            <div className="availabilityElements">
                {availabilityElements}
            </div>
            
            <img className="available_schedule_btn" onClick={openAddSchedulePopup} src={add_icon}/>
            
            <AddSchedulePopup/>
        </div>
    )
}

function openAddSchedulePopup(){

    let addSchedulePopup = document.querySelector(".add_schedule_popup")
    addSchedulePopup.classList.toggle("active")

}