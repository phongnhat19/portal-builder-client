import axios from 'axios';

const getNotify = () => {
  return axios({
    method: 'get',
    baseURL: 'https://' + window.location.host,
    url: '/g/api/v1/notification/items',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then((resp) => {
    return resp.data.items;
  });
};

const getNotifyEvent: () => Promise<SchedulerEvent[]> = () => {
  return getNotify()
    .then((items) => {
      return items.map((item: NotificationGRN) => {
        return {
          url: item.url,
          title: item.title,
          body: item.body,
          isRead: item.isRead,
          createdAt: item.createdAt,
          creator: {
            name: item.creator?.name,
            code: item.creator?.code
          }
        };
      });
    });
};

export {getNotifyEvent};