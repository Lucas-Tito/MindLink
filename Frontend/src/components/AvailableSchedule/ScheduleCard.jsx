import "./schedule_card.css"
import edit_icon from "../../assets/editIcon.svg"

export default function ScheduleCard(){
    return(
       
        <div className="schedule_card">
            <div className="schedule_card_title">
                <span>Segunda</span>
            </div>

            <hr/>

            <span className="schedule_card_period">09:00 - 15:00</span>

            <button className="editBtn"><img src={edit_icon}/></button>
        </div>
 
    )
}