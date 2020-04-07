import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { SCHEDULE_VIEW } from './constant';

const Schedule = ({defaultView}: {
  defaultView?: string
}) => {

  return(
    <div style={{backgroundColor: '#FFFFFF'}}>
      <FullCalendar
        header={{
          left: `prev,next ${SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME}, ${SCHEDULE_VIEW.FULL_CALENDAR_WEEK_TIME}`,
          center: 'title',
          right: ''
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        defaultView={defaultView}
        events={
          [{
            title: 'SAMPLE APPOINTMENT',
            start: (new Date()).setHours(9),
            end: (new Date()).setHours(11),
            // url: 'https://github.com/fullcalendar/fullcalendar',
          }]
        }
      />
    </div>
  )
}

export default Schedule