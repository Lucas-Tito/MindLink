import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "bootstrap/dist/css/bootstrap.min.css";

const ClockPicker = () => {
  const [time, setTime] = useState("06:00");

  return (
    <div style={{ width: "180px", marginTop: "8px" }}>
      <div className="input-group clockpicker" data-autoclose="true">
        <input
          type="text"
          className="form-control"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <span className="input-group-addon" id="clock-icon">
          <span className="fa fa-clock-o fa-lg"></span>
        </span>
      </div>

      <TimePicker
        onChange={setTime}
        value={time}
        disableClock={true}
      />
    </div>
  );
};

export default ClockPicker;
