import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios'
import '@fullcalendar/core/main.css';

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
  getGaroonUserID()
    .then(getScheduleByUserID)
    .then((eventList) => {
      const calendarEl = document.createElement('div')

      let calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin ],
        defaultView: 'dayGridWeek',
        events: eventList.map((event) => {
          return {
            id: event.id,
            title: event.subject,
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime)
          }
        })
      });

      calendar.render();

      return calendarEl
    }).catch((err) => {
      console.error(err)
    })
}

export {createScheduleWidget}