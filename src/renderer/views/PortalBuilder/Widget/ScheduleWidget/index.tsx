import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { SCHEDULE_VIEW } from './constant';
import './main.scss'
import './style.css'

const ScheduleWidget = ({ width, height, defaultView = SCHEDULE_VIEW.DAY_VIEW }: {
  defaultView?: string
  width?: string | number
  height?: string | number
}) => {

  return (
    <div style={{ width, height }}>
      <FullCalendar
        header={{
          left: 'prev,next today',
          center: 'title',
          right: `${SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME}, ${SCHEDULE_VIEW.FULL_CALENDAR_WEEK_TIME}`
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        defaultView={defaultView !== SCHEDULE_VIEW.DAY_VIEW ? SCHEDULE_VIEW.FULL_CALENDAR_WEEK_TIME : SCHEDULE_VIEW.FULL_CALENDAR_DAY_TIME}
        events={
          [{
            title: 'event3',
            start: new Date('2020-03-23T06:00:00'),
            end: new Date('2020-03-23T11:00:00'),
            allDay: false
          },
          {
            title: 'event1',
            start: '2020-03-23T10:00:00',
            allDay: false
          },
          {
            title: 'event2',
            start: '2020-03-23',
            end: '2020-03-26',
            allDay:true
          }]
        }
      />
    </div>
  )
}

export default ScheduleWidget