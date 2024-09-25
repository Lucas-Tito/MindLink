import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import "./add_schedule_popup.css"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import WeekDayPicker from "./WeekDayPicker";


export default function AddSchedulePopup(){
    return(
        <div className="add_schedule_popup">
            <button className="close_btn" onClick={closeBtn_Click}></button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker label="Início do Período"/>
                <MobileTimePicker label="Fim do Período"/>
            </LocalizationProvider>

            <WeekDayPicker/>
            
        </div>
    )
}

function closeBtn_Click(){
    document.querySelector(".add_schedule_popup").classList.remove("active")
}