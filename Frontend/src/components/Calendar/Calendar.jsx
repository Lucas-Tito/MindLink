import React, { useEffect } from "react"
import "./calendar.css"
import mock_array from "./mock_array"

export default function Calendar() {

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
                let targetRow = document.querySelector("tr")[(hour-7)*4]

                console.log("oi"+(hour-7)*4);
                console.log(targetRow);
                
                if(targetRow){
                    targetRow.style.color= "black";
                }
            });   
        }
        
    })

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
                            <span className="day active">5</span>
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