import React, {useState, useEffect} from 'react';
import {getNotifyEvent} from './service';
import './style.css';

const Notify = ({defaultView, isPreview}: {
  defaultView?: string;
  isPreview?: boolean;
}) => {
  const initNotifications: any[] = [
    {
      url: '',
      title: 'Sample Notification',
      body: 'This is body',
      isRead: false,
      createdAt: '2017-09-26T06:25:18Z',
      creator: {
        name: 'Admin',
        code: 'Admin'
      }
    }
  ];
  const [notifications, setNotifications] = useState(initNotifications);

  useEffect(() => {
    if (!isPreview) {
      getNotifyEvent().then((rsp: any[]) => {
        setNotifications(rsp);
      });
    }
  }, [isPreview]);

  return (
    <div className="grn_notify_container">
      <div>
        <span className="grn_notify_title">G Notifications</span>
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
            return (
              <li className="grn_notify_item " key={index}>
                <div className="grn_notify_item_main">
                  <div className="grn_notify_itemTitle">
                    <span className="grn_notify_item_wrap">
                      <a className="grn_notify_img" title={item.title} href={item.url}>
                        <img className="grn_notify_icon_title" />
                        {item.title}
                      </a>
                      <span className="grn_notify_itemTime">{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} {date.getHours()} : {date.getMinutes()}</span>
                    </span>
                  </div>
                  <div>
                    <span className="grn_notify_item_wrap">
                      <a className="grn_notify_img" title={item.creator?.name} href="#">
                        <img className="grn_notify_user" />
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