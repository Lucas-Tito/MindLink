import "./schedule_card.css"
import edit_icon from "../../assets/editIcon.svg"

export default function ScheduleCard(props){
    return(
       
        <div className="schedule_card">
            <div className="schedule_card_title">
                <span>{props.dayOfWeek}</span>
            </div>

            <hr/>

            <span className="schedule_card_period">
                {props.startTime.startHour}:{props.startTime.startMinute} - {props.endTime.endHour}:{props.endTime.endMinute}
            </span>

            <button className="editBtn"><img src={edit_icon}/></button>
        </div>
 
    )
}