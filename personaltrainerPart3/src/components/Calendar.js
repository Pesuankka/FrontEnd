import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function AppCalendar(props) {
  const [workout, setWorkOut] = useState([]);

  useEffect(() => {
    getTrainingEvents();
  }, []);

  const getTrainingEvents = (getInformation) => {
    fetch("https://customerrest.herokuapp.com/gettrainings", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(getInformation),
    })
      .then((response) => response.json())
      .then((data) => setWorkOut(data))
      .catch((err) => console.log(err));
    console.log(events);
  };
  //
  const events = workout.map((data) => {
    console.log(workout);
    return {
      title: [
        data.activity +
          " / " +
          data.customer.firstname +
          " " +
          data.customer.lastname,
      ],
      start: moment(data.date).toDate(),
      end: moment(data.date).add(data.duration, "minutes").toDate(),
      allDay: false,
    };
  });

  return (
    <div style={{ marginTop: 40 }}>
      <div className='training'>Calendar</div>
      <Calendar
        defaultView="month"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default AppCalendar;
