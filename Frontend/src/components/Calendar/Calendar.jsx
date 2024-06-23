import React, { useEffect } from "react"
import "./calendar.css"
import mock_array from "./mock_array"
import currentWeekDays from "./current_week_days"

export default function Calendar() {

    useEffect(() => {
        const tabela = document.querySelector("#appointments_table")
        if (tabela) {   
            let table_headers = document.querySelectorAll("th")
    
            /**
             * the first one is th for hours, so it should be skipped,
             * also inside each th there us three spans, of which the first is the day.
             */
            let headers_spans = [
                table_headers[1].querySelector("span"),
                table_headers[2].querySelector("span"),
                table_headers[3].querySelector("span"),
                table_headers[4].querySelector("span"),
                table_headers[5].querySelector("span"),
                table_headers[6].querySelector("span"),
                table_headers[7].querySelector("span"),
            ]

            const today = new Date().getDate();
            for (let i = 0; i < headers_spans.length; i++) {
                headers_spans[i].textContent = currentWeekDays[i]
                if(today == headers_spans[i].textContent){
                    // console.log("got in");
                    headers_spans[i].classList.add("active")
                }
                // console.log("today="+today+" header="+headers_spans[i].textContent);
            }
        }
    }, [])

    /**
     * For a better understanding of the following code I will hereby present an example:
     * If you want to make black the cell corresponding to monday at 7am, you need to
     * select the first td (cell) after the td corresponding to the hour information in the 
     * first four rows, since each hours equals 4 tds and each td equals 15 minutes.
     */
    useEffect(() => {
        const appointments = mock_array
        const tabela = document.querySelector("#appointments_table")
        if (tabela) {
            appointments.forEach(session => {
                /**
                 * the following calculation gets the last row of the selected hour,
                 * so it's necessary to also go back three rows.
                 */
                let hour = parseInt(session.date.hour.split(":")[0])
                let targetRow = [
                    document.querySelectorAll("tr")[(hour-7)*4],
                    document.querySelectorAll("tr")[((hour-7)*4)-1],
                    document.querySelectorAll("tr")[((hour-7)*4)-2],
                    document.querySelectorAll("tr")[((hour-7)*4)-3]
                ]

                // console.log("oi"+(hour-7)*4);
                // console.log(targetRow);

                //verifies if targetRow isn't null
                if(targetRow){
                    let targetRowCells = [
                        targetRow[0].querySelectorAll("td"),
                        targetRow[1].querySelectorAll("td"),
                        targetRow[2].querySelectorAll("td"),
                        targetRow[3].querySelectorAll("td")
                    ]
                    let targetCellIndex = [0, 0, 0, 0]
                    
                    // console.log("targetRowCells");
                    // console.log(targetRowCells);

                    /**
                     * if there is 8 cells, it means that one of them bellongs to the hour,
                     * so the following code ignores the hour cell
                     */

                    for (let i = 0; i < targetRowCells.length; i++) {
                        if(targetRowCells[i].length == 8){
                            targetCellIndex[i]=1
                        }
                    }

                    //gets a index from 0-6 in which 0 is sunday
                    let dayOfWeek = new Date(`${session.date.year}-${session.date.month}-${session.date.day}`).getDay()



                    /**
                     * The following calculation does a convertion of the day of week to the cell index,
                     * this is necessary because the day of week index starts at sunday, and the tds start at monday  
                     */
                    let targetCell = [
                        targetRowCells[0][targetCellIndex[0]+(dayOfWeek-1)],
                        targetRowCells[1][targetCellIndex[1]+(dayOfWeek-1)],
                        targetRowCells[2][targetCellIndex[2]+(dayOfWeek-1)],
                        targetRowCells[3][targetCellIndex[3]+(dayOfWeek-1)]
                    ]

                    if (targetCell) {
                        if(!targetCell[0].querySelector("button")){
                            let button = document.createElement("button")
                            button.textContent = "Butaum"
                            button.addEventListener("click", function() {
                                alert("Butaum was clicked!");
                            });

                            targetCell[0].appendChild(button)
                        }
 

                        targetCell[0].classList.add("session_active")
                        
                        targetCell[1].classList.add("session_active")

                        targetCell[2].classList.add("session_active")
                        targetCell[2].textContent = hour

                        targetCell[3].classList.add("session_active")
                        targetCell[3].textContent = session.patient
                    }

                    /**
                     * Since we only finished the last row of the card,
                     * now it's necessary to go back three rows to finish the card
                     */
                }
            });   
        }
        
    }, [])

    return (
        <div className="table_container">
            <table id="appointments_table">
                <thead>

                    {/* week days row */}
                    <tr>
                        <th></th> {/* no header for hours column */}
                        <th>
                            <span className="day">1</span>
                            <span className="long">Segunda</span>
                            <span className="short">Seg</span>
                        </th>
                        <th>
                            <span className="day">2</span>
                            <span className="long">Terça</span>
                            <span className="short">Ter</span>
                        </th>
                        <th>
                            <span className="day">3</span>
                            <span className="long">Quarta</span>
                            <span className="short">Qua</span>
                        </th>
                        <th>
                            <span className="day">4</span>
                            <span className="long">Quinta</span>
                            <span className="short">Qui</span>
                        </th>
                        <th>
                            <span className="day">5</span>
                            <span className="long">Sexta</span>
                            <span className="short">Sex</span>
                        </th>
                        <th>
                            <span className="day">6</span>
                            <span className="long">Sábado</span>
                            <span className="short">Sab</span>
                        </th>
                        <th>
                            <span className="day">7</span>
                            <span className="long">Domingo</span>
                            <span className="short">Dom</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="hour" rowSpan="4"><span>7 AM</span></td>
                        <td style={{ backgroundColor: 'black', color: 'white' }}>Lázaro da Silva</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: 'black', color: 'white' }}>12:00 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: 'black', color: 'white' }}></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: 'black', color: 'white' }}>Button</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour" rowSpan="4"><span>8 AM</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td className="hour" rowSpan="4"><span>9 AM</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour" rowSpan="4"><span>10 AM</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour" rowSpan="4"><span>11 AM</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour" rowSpan="4"><span>12 PM</span></td>
                        <td onclick="alert('test')"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour" rowSpan="4"><span>1 PM</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour" rowSpan="4"><span>2 PM</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}