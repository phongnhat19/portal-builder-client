import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

const getGaroonUserID = () => {
  return axios({
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    baseURL: 'https://' + window.location.host,
    url: '/g/api/v1/base/users',
    params: {
      name: kintone.getLoginUser().name
    }
  }).then(function(resp) {
    if (!resp.data.users || resp.data.users.length === 0) return ''
    return resp.data.users[0].id
  })
}

const getScheduleByUserID = (userID) => {
  return axios({
    method: 'get',
    baseURL: 'https://' + window.location.host,
    url: '/g/api/v1/schedule/events',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    params: {
      targetType: 'user',
      target: userID
    }
  }).then(function(resp) {
    return resp.data.events;
  })
}

const createScheduleWidget = (props) => {
  const calendarEl = document.createElement('div')
  calendarEl.style.backgroundColor = '#FFFFFF'
  calendarEl.style.padding = '5px'
  let calendar = new Calendar(calendarEl, {
    header: {
      left: '',
      center: 'title',
      right: `prev,next timeGridDay, timeGridWeek`
    },
    plugins: [ dayGridPlugin, timeGridPlugin ],
    defaultView: props.defaultView || 'dayGridWeek',
    events: []
  });

  getGaroonUserID()
    .then(getScheduleByUserID)
    .then((eventList) => {
      eventList.forEach((event) => {
        calendar.addEvent({
          id: event.id,
          title: event.subject,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          allDay: event.isAllDay
        })
      })
      calendar.render();
    }).catch((err) => {
      console.error(err)
    })

  return calendarEl
}

export {createScheduleWidget}