import React, { useEffect, useState } from "react";
import "./calendar.css";
import firebase from "firebase/compat/app";
import mock_array from "./mock_array";
import currentWeekDays from "./utils/current_week_days";
import convertHourFormat from "./utils/convertHourFormat";
import arrow_left_icon from "../../assets/arrow_left.svg";
import arrow_right_icon from "../../assets/arrow_right.svg";
import getCurrentMonth from "./utils/getCurrentMonth";
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const navigate = useNavigate();
  const auth = firebase.auth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const tabela = document.querySelector("#appointments_table");
    if (tabela) {
      let table_headers = document.querySelectorAll("th");

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
      ];

      //Filling headers with current week days
      const today = new Date();
      for (let i = 0; i < headers_spans.length; i++) {
        headers_spans[i].textContent = currentWeekDays[i];

        //Highlights current day
        if (today.getDate() == headers_spans[i].textContent) {
          // console.log("got in");
          table_headers[i + 1].classList.add("active");
        }
        // console.log("today="+today+" header="+headers_spans[i].textContent);
      }

      //Fills week selector
      let weekSelectorSpan = document.querySelector(".week_selector_span");
      weekSelectorSpan.textContent = `${getCurrentMonth} ${currentWeekDays[0]}
             - ${currentWeekDays[6]}, ${today.getFullYear()}`;
    }
  }, []);

  useEffect(() => {
    //gets all appointments in the current week of a specific professional
    const fetchAppointments = async () => {
      try {
        const userId = auth.currentUser.uid;
        const response = await fetch(
          `http://localhost:3000/mindlink/appointments/professional/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();

        console.log("data useEffec fetchAppointments");
        console.log(data);

        setAppointments(data);
        console.log("appointments useEffec fetchAppointments:");

        console.log(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  /**
   * For a better understanding of the following code I will hereby present an example:
   * If you want to make black the cell corresponding to monday at 7am, you need to
   * select the first td (cell) after the td corresponding to the hour information in the
   * first four rows, since each hours equals 4 tds and each td equals 15 minutes.
   */
  useEffect(() => {
    if (appointments.length > 0) {
      const tabela = document.querySelector("#appointments_table");

      if (tabela) {
        console.log("entrou if tabela");
        console.log(appointments);

        appointments.forEach((session) => {
          console.log("entrou foreach");
          /**
           * the following calculation gets the last row of the selected hour,
           * so it's necessary to also go back three rows.
           */
          let hour = parseInt(session.appointmentDate.hour);
          console.log("hour:");
          console.log(hour);

          const rows = document.querySelectorAll("tr");
          console.log("rows");
          console.log(rows);

          let targetRow = [];
          if (rows.length > (hour - 6) * 4) {
            targetRow = [
              rows[(hour - 6) * 4],
              rows[(hour - 6) * 4 - 1],
              rows[(hour - 6) * 4 - 2],
              rows[(hour - 6) * 4 - 3],
            ];
          }
          // console.log("oi"+(hour-6)*4);
          console.log("targetRow:");

          console.log(targetRow);

          //verifies if targetRow isn't null
          if (targetRow.length >= 4) {
            let targetRowCells = [
              targetRow[0].querySelectorAll("td"),
              targetRow[1].querySelectorAll("td"),
              targetRow[2].querySelectorAll("td"),
              targetRow[3].querySelectorAll("td"),
            ];
            let targetCellIndex = [0, 0, 0, 0];

            // console.log("targetRowCells");
            // console.log(targetRowCells);

            /**
             * if there is 8 cells, it means that one of them bellongs to the hour,
             * so the following code ignores the hour cell
             */

            for (let i = 0; i < targetRowCells.length; i++) {
              if (targetRowCells[i].length == 8) {
                targetCellIndex[i] = 1;
              }
            }

            //gets a index from 0-6 in which 0 is sunday
            let dayOfWeek = new Date(
              `${session.appointmentDate.year}-${session.appointmentDate.month}-${session.appointmentDate.day}`
            ).getDay();

            /**
             * The following calculation does a convertion of the day of week to the cell index,
             * this is necessary because the day of week index starts at sunday, and the tds start at monday
             */
            let targetCell = [
              targetRowCells[0][targetCellIndex[0] + (dayOfWeek - 1)],
              targetRowCells[1][targetCellIndex[1] + (dayOfWeek - 1)],
              targetRowCells[2][targetCellIndex[2] + (dayOfWeek - 1)],
              targetRowCells[3][targetCellIndex[3] + (dayOfWeek - 1)],
            ];

            if (targetCell) {
              if (!targetCell[0].querySelector("button")) {
                let button = document.createElement("button");
                button.textContent = "Ver";
                button.addEventListener("click", function () {
                  navigate("/notificationPsycho");
                });

                targetCell[0].appendChild(button);
              }

              targetCell[0].classList.add("session_active");

              targetCell[1].classList.add("session_active");

              targetCell[2].classList.add("session_active");
              targetCell[2].textContent = convertHourFormat(
                session.appointmentDate.hour +
                  ":" +
                  session.appointmentDate.minutes
              );

              targetCell[3].classList.add("session_active");
              targetCell[3].textContent = session.patientName;
            }

            /**
             * Since we only finished the last row of the card,
             * now it's necessary to go back three rows to finish the card
             */
          }
        });
      }
    }
  }, [appointments]);

  return (
    <div className="table_container">
      <div className="week_selector">
        <button>
          <img src={arrow_left_icon} />
        </button>
        <span className="week_selector_span"></span>
        <button>
          <img src={arrow_right_icon} />
        </button>
      </div>

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
            <td className="hour" rowSpan="4">
              <span>7 AM</span>
            </td>
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
            <td className="hour" rowSpan="4">
              <span>8 AM</span>
            </td>
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
            <td className="hour" rowSpan="4">
              <span>9 AM</span>
            </td>
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
            <td className="hour" rowSpan="4">
              <span>10 AM</span>
            </td>
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
            <td className="hour" rowSpan="4">
              <span>11 AM</span>
            </td>
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
            <td className="hour" rowSpan="4">
              <span>12 PM</span>
            </td>
            <td onClick={() => alert("teste")}></td>
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
            <td className="hour" rowSpan="4">
              <span>1 PM</span>
            </td>
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
            <td className="hour" rowSpan="4">
              <span>2 PM</span>
            </td>
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
  );
}
