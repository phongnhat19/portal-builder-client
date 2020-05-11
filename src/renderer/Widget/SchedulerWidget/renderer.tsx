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

const Scheduler = ({defaultView = SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME, data = [], onSaveModal}: {
  defaultView?: string;
  data?: SchedulerEvent[];
  onSaveModal: boolean;
}) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState(data);

  useEffect(() => {
    if (data.length === 0 && window.kintone) getSchedulerEvent().then(setEvents);
  }, [data.length]);

  useEffect(() => {
    const calendarApi = (calendarRef.current)!.getApi();
    if (onSaveModal) {
      calendarApi.changeView(defaultView);
    }
  }, [defaultView, onSaveModal]);

  return (
    <div style={{backgroundColor: '#FFFFFF'}}>
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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        defaultView={defaultView}
        events={events}
      />
    </div>
  );
};

export default Scheduler;