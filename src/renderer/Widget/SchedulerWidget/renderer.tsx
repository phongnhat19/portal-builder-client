import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import {SCHEDULER_VIEW} from './constant';
import {getSchedulerEvent} from './service';

const Scheduler = ({defaultView, data = []}: {
  defaultView?: string;
  data?: SchedulerEvent[];
}) => {

  const [events, setEvents] = useState(data);

  useEffect(() => {
    if (data.length === 0 && window.kintone) getSchedulerEvent().then(setEvents);
  }, [data.length]);

  return (
    <div style={{backgroundColor: '#FFFFFF'}}>
      <FullCalendar
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