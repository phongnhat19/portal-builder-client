import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';

const createScheduleWidget = (props) => {
  const calendarEl = document.createElement('div')

  let calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin ],
    defaultView: 'dayGridWeek',
    events: props.events
  });

  calendar.render();

  return calendarEl
}

export {createScheduleWidget}