import axios from 'axios'

const getGaroonUserID: () => Promise<string> = () => {
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

const getScheduleByUserID = (userID: string) => {
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

const getSchedulerEvent: () => Promise<SchedulerEvent[]> = () => {
  return getGaroonUserID()
    .then(getScheduleByUserID)
    .then((eventList) => {
      return eventList.map((event: any) => {
        return {
          id: event.id,
          title: event.subject,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          allDay: event.isAllDay
        }
      })
    })
}

export {getSchedulerEvent}