import React, {useState, useEffect} from 'react';
import {getNotifyEvent} from './service';
import './style.css';

const Notify = ({data}: {
  data: NotificationGRN[];
}) => {
  const [notifications, setNotifications] = useState(data);

  useEffect(() => {
    if (data.length === 0 && window.kintone) getNotifyEvent().then(setNotifications);
  }, [data.length]);

  return (
    <div className="grn_notify_container">
      <div className="g_notify_header">
        <div className="g_notify_icon">G</div>
        <div className="g_notify_title">Notifications</div>
      </div>
      <div>
        {(notifications.length === 0) &&
          <div>
            <div className="grn_notidy_empty">
              <span>No notifications to show.</span>
            </div>
          </div>
        }
      </div>
      <div className="grn_notify_read">
        <ul>
          {notifications.map((item: NotificationGRN, index) => {
            const date = new Date(item.createdAt);
            const hoursFormat = ('0' + date.getHours()).slice(-2);
            return (
              <li className="grn_notify_item " key={index}>
                <div className="grn_notify_item_main">
                  <div className="grn_notify_itemTitle">
                    <span className="grn_notify_item_wrap">
                      <a className="grn_notify_img" title={item.title} href={item.url}>
                        <img alt="Garoon icon" className="grn_notify_icon_title" />
                        {item.title}
                      </a>
                      <span className="grn_notify_itemTime">
                        { `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`} {hoursFormat} : {date.getMinutes()}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="grn_notify_item_wrap">
                      <a className="grn_notify_img" title={item.creator?.name} href={`https://${window.location.host}/users/${item.creator?.code}`}>
                        <img alt="user icon" className="grn_notify_user" />
                        {item.creator?.name}
                      </a>
                    </span>
                  </div>
                  <div>
                    <span className="grn_notify_item_body">{item.body}</span>
                  </div>
                </div>
              </li>
            );
          })
          }
        </ul>
      </div>
    </div>
  );
};

export default Notify;