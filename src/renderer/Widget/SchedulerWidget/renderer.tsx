import React, {useState, useEffect, useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './style.css';
import {SCHEDULER_VIEW} from './constant';
import {getSchedulerEvent} from './service';

const Scheduler = ({defaultView = SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME, data = []}: {
  defaultView?: string;
  data?: SchedulerEvent[];
}) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState(data);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(defaultView);
    }
  }, [defaultView]);

  useEffect(() => {
    if (data.length === 0 && window.kintone) getSchedulerEvent().then(setEvents);
  }, [data.length]);

  return (
    <div className="scheduler-widget-container">
      <div style={{backgroundColor: '#FFFFFF', padding: '10px'}}>
        <div className="g_schedule_header">
          <div className="g_schedule_icon">G</div>
          <div className="g_schedule_title">Schedule</div>
        </div>
        <FullCalendar
          ref={calendarRef}
          header={{
            left: `prev,next ${SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME}, ${SCHEDULER_VIEW.FULL_CALENDAR_WEEK_TIME}`,
            center: 'title',
            right: ''
          }}
          contentHeight="auto"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          defaultView={defaultView}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          events={events}
          eventClick={(e)=> {
            if (window.kintone) {
              window.location.href = window.location.origin + '/g/schedule/view.csp?event=' + e.event.id;
            }
          }}
        />
      </div>
    </div>
  );
};

export default Scheduler;