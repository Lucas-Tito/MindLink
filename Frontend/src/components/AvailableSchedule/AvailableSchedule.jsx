import "./available_schedule.css"
import add_icon from "../../assets/add_icon.svg"
import ScheduleCard from "./ScheduleCard"
import AddSchedulePopup from "./AddSchedulePopup/AddSchedulePopup"

export default function AvailableSchedule(){
    return(
        <div className="available_schedule">
            <h1>Horários de Atendimento</h1>
            <ScheduleCard/>
            <img className="available_schedule_btn" onClick={openAddSchedulePopup} src={add_icon}/>
            
            <AddSchedulePopup/>
        </div>
    )
}

function openAddSchedulePopup(){

    let addSchedulePopup = document.querySelector(".add_schedule_popup")
    addSchedulePopup.classList.toggle("active")

}